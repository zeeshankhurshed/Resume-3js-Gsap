import { asyncHandler } from "../middleware/asyncHandler.js"
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { genToken } from "../utils/genToken.js";

export const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, role, descriptor } = req.body;

    // Validation
    if (!name || !email || !password || !role || !descriptor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", // You can use logic to conditionally assign 'admin'
      descriptor,
    });

    // Generate token and set cookie
    const token = await genToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const normalizeVector = (vec) => {
    const length = Math.sqrt(vec.reduce((acc, val) => acc + val * val, 0));
    return vec.map(v => v / length);
};

export const login = asyncHandler(async (req, res) => {
  try {
    let { descriptor } = req.body;
    if (!descriptor) {
      return res.status(400).json({ message: "Face descriptor required" });
    }

    descriptor = normalizeVector(descriptor);
    const users = await User.find({});

    let mathedUser = null;
    let lowestDistant = Infinity;

    users.forEach(user => {
      if (!user.descriptor || user.descriptor.length !== descriptor.length) return;

      const normalizedUserDescriptor = normalizeVector(user.descriptor);

      const distance = Math.sqrt(
        normalizedUserDescriptor.reduce((sum, val, i) => {
          return sum + Math.pow(val - descriptor[i], 2);
        }, 0)
      );

      if (distance < 0.6 && distance < lowestDistant) {
        lowestDistant = distance;
        mathedUser = user;
      }
    });

    if (!mathedUser) {
      return res.status(401).json({ message: "Face not recognized" });
    }

    const token = await genToken(mathedUser._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Send structured response
    res.status(200).json({
      user: {
        _id: mathedUser._id,
        name: mathedUser.name,
        email: mathedUser.email,
        role: mathedUser.role,
        descriptor: mathedUser.descriptor,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export const logout=asyncHandler(async(req,res)=>{
  try {
    res.clearCookie("token");
    return res.status(200).json({message:"Logout Successfully"})
  } catch (error) {
    console.log("logout error");
    return res.status(500).json({message:`Logout error ${error}`})
  }
})

// export const getCurrentUser=asyncHandler(async(req,res)=>{
//   try {
//     let user=await User.findById(req.userId).select("-password");

//     if(!user){
//       return res.status(404).json({message:"usr not found"})
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({messge:`getCurrentUser error ${error}`})
//   }
// })