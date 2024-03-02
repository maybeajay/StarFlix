import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(false);
    const [userToken, setuserToken] = useState(null);
    const Login = ()=>{
        setLoading(true);
        setuserToken("SADHSDIUAD");
        AsyncStorage.setItem("userToken", "SADHSDIUAD");
        setLoading(false);
    }
    const Logout = ()=>{
        setLoading(true);
        setuserToken(null);
        AsyncStorage.removeItem("userToken");
        setLoading(false);
    }
    const isLoggedIn = async()=>{
        setLoading(true);
        try {
            let userToken = await AsyncStorage.getItem("userToken");
            setuserToken(userToken);
        } catch (error) {
            console.log(error)
        }finally{
        setLoading(false);
        }
    }
    useEffect(()=>{
        isLoggedIn();
    },[])
    return(
        <AuthContext.Provider value={{loading, Login, Logout, userToken, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}