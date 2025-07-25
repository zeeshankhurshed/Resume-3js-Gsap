import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    useEffect(()=>{
        const storedUser=localStorage.getItem("user");
        const token=localStorage.getItem("token");
        if(storedUser && token){
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true)
        }
    },[]);

    const login=(userData)=>{
        setIsAuthenticated(true);
        localStorage.setItem('user',JSON.stringify(userData));
    };

    const logout=()=>{
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };
    return(
    <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);