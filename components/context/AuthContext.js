import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import {EXPO_PUBLIC_API_URL, EXPO_PUBLIC_ACCESS_TOKEN,EXPO_PUBLIC_API_KEY} from "@env"
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(false);
    const [userToken, setuserToken] = useState(null);
    const Headers = {
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: EXPO_PUBLIC_ACCESS_TOKEN
        }
    }
    const getRequestToken = async()=>{
        try {
            const res = await axios.get(`${EXPO_PUBLIC_API_URL}authentication/token/new`, Headers);
            console.log("TEMP REQ TOKEN", res?.data?.request_token);
            await AsyncStorage.setItem('RequestToken', res?.data?.request_token);
        } catch (error) {
            console.log(error);
        }finally{
            
        }
    }
    const Login = async (userData)=>{
        getRequestToken();
        let result = await AsyncStorage.getItem("RequestToken");
        let data = {...userData, request_token: result};
        setLoading(true);
        try {
            const res = await axios.post(`${EXPO_PUBLIC_API_URL}authentication/token/validate_with_login`, data, {
                headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: EXPO_PUBLIC_ACCESS_TOKEN
                }
            });
            if(res?.data?.success == true){
            await AsyncStorage.setItem("userToken", res?.data?.request_token)
            }
        } catch (error) {
            console.log(error);
            console.log("CATCHH", error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
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