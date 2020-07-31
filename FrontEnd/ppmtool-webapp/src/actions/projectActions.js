import api from '../api/api';
import {GET_ERRORS} from "../constants/errorTypes";
import {ADD_PROJECT} from "../constants/projectTypes";
export const createProject=(project,history)=>async dispatch=>{
    return await api.post("/api/project/create",project,{
        headers: { 
            'Accept': '*/*',
            'Content-Type': 'application/json' 
        }
    })
    .then((res)=>{
        console.log(res);
        dispatch({
            type:ADD_PROJECT,
            payload:res.data
        })
        history.push("/dashboard");
    }).catch((err)=>{
        console.log("An error occurs inside projectActions.createProject().api.catch(err)");
        console.log(err); 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }) 
}