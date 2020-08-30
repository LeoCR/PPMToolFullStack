import api from "../api/api";
import {SET_CURRENT_USER} from "../constants/securityTypes";
import {GET_ERRORS,CLEAR_ERRORS} from "../constants/errorTypes"
import { setJWTToken } from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
export const createNewUser=(newUser,history)=>async dispatch=>{
    try {
        await api.post('/api/users/register',newUser)
        .then((res)=>{
            if(res.data!==null){
                history.push("/login")
                dispatch({
                   type:CLEAR_ERRORS
                })
            }
        })
        .catch((err)=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error
        })
    }
}
export const login=LoginRequest=>async dispatch=>{
    try {
        //post => Login Request
        await api.post("/api/users/login",LoginRequest)
        .then((res)=>{
            //extract token from res.data
            const {token}=res.data;
             //store the token in the localStorage
            localStorage.setItem("jwtToken",token)
            //set our token in the header
            setJWTToken(token);
            //decode token on React
            const decoded= jwt_decode(token);
            //dispatch to our securityReducer
            dispatch({
                type:SET_CURRENT_USER,
                payload:decoded
            })
        })
        .catch((err)=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error
        })
    }
}
export const logout=()=>dispatch=>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}