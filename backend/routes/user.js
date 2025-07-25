import express from 'express';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { createUser,  login, logout } from '../controller/user.js';


const router=express.Router();

router.post('/signup', createUser);

router.post('/login', loginLimiter,login)

router.post('/logout',logout);

// router.get('/getCurrentUser',getCurrentUser)

// router.get('/getAllUser', authMiddleware,adminOnly,fetchAllUser);

// router.get('/getSingleUser/:id', authMiddleware,adminOnly,fetchSingleUser);

// router.delete('/deleteUser/:id', authMiddleware,adminOnly,deleteUser);

// router.put('/updateUser/:id',authMiddleware,adminOnly,updateUser);


export default router;