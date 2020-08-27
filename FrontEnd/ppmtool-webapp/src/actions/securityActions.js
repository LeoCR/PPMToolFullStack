import api from "../api/api";
import {GET_ERRORS,CLEAR_ERRORS} from "../constants/errorTypes"

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
            payload:error.response.data
        })
    }
}