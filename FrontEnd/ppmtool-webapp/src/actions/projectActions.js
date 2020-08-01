import api from '../api/api';
import {GET_ERRORS} from "../constants/errorTypes";
import {ADD_PROJECT,GET_PROJECTS} from "../constants/projectTypes";

export const getProjects=()=>async dispatch=>{
    return await api.get("/api/project/getAll")
    .then((res)=>{
        console.log(res);
        dispatch({
            type:GET_PROJECTS,
            payload:res.data
        }) 
    }).catch((err)=>{
        console.log("An error occurs inside projectActions.getProjects().api.get.catch(err)");
        console.log(err); 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }) 
}

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
        console.log("An error occurs inside projectActions.createProject().api.post.catch(err)");
        console.log(err); 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }) 
}