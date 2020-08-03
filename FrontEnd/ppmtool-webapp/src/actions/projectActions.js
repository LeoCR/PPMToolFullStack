import api from '../api/api';
import {GET_ERRORS} from "../constants/errorTypes";
import {ADD_PROJECT,GET_PROJECTS,GET_PROJECT,UPDATE_PROJECT, DELETE_PROJECT} from "../constants/projectTypes";

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
export const getProject=(id,history)=>async dispatch=>{
    return await api.get("/api/project/getByIdentifier/"+id)
    .then((res)=>{
        console.log(res);
        dispatch({
            type:GET_PROJECT,
            payload:res.data
        }) 
    }).catch((err)=>{
        console.log("An error occurs inside projectActions.getProject().api.get.catch(err)");
        console.log(err); 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
        history.push("/dashboard")
    }) 
}
export const updateProject=(project,history)=>async dispatch=>{
    return await api.put("/api/project/update",project,{
        headers: { 
            'Accept': '*/*',
            'Content-Type': 'application/json' 
        }
    })
    .then((res)=>{
        console.log(res);
        dispatch({
            type:UPDATE_PROJECT,
            payload:res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload:{}
        });;
        history.push("/dashboard");
    }).catch((err)=>{
        console.log("An error occurs inside projectActions.updateProject().api.put.catch(err)");
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
export const deleteProject=id=> async dispatch=>{
    if(window.confirm("Are you sure you want to delete this Project?")){
        await api.delete('/api/project/delete/'+id)
        .catch((err)=>{
            console.log("An error occurs inside projectActions.deleteProject(id).api.delete.catch(err)");
            console.log(err); 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }); 
        dispatch({
            type:DELETE_PROJECT,
            payload:id
        }) 
    }
}