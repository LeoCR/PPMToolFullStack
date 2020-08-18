import api from '../api/api';
import {GET_BACKLOG,GET_PROJECT_TASK,DELETE_PROJECT_TASK} from "../constants/backlogTypes";
import { GET_ERRORS,CLEAR_ERRORS } from '../constants/errorTypes';

export const addProjectTask=(backlog_id,project_task,history)=> async dispatch=>{
    try {
        await api.post(`/api/backlog/create/${backlog_id}`,project_task)
        .then((res)=>{
            if(res.data!==null){
                dispatch({
                    type: CLEAR_ERRORS
                });
                history.push(`/projectBoard/${backlog_id}`)
            }
        })
        .catch((err)=>{
            console.log("An error occurs inside backlogActions.addProjectTask().try.api.post.catch(err)");
            console.log(err); 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
    } catch (error) {
        console.log("An error occurs inside backlogActions.addProjectTask().catch(err)");
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }  
}
export const getBacklog=backlog_id=> async dispatch=>{
    try {
        await api.get('/api/backlog/getProjectBacklog/'+backlog_id)
        .then((res)=>{
            dispatch({
                type: CLEAR_ERRORS
            });
            dispatch({
                type:GET_BACKLOG,
                payload:res.data
            })
        })
        .catch((err)=>{
            console.log("An error occurs inside backlogActions.getBacklog().try.api.get.catch(err)");
            console.log(err); 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
    } catch (error) {
        console.log("An error occurs inside backlogActions.getBacklog().catch(err)");
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}
export const getProjectTask=(backlog_id,pt_id,history)=>async dispatch=>{
    try {
        await api.get('/api/backlog/getProjectTask/'+backlog_id+'/'+pt_id)
        .then((res)=>{
            dispatch({
                type:GET_PROJECT_TASK,
                payload:res.data
            })
        })
        .catch((err)=>{
            console.log("An error occurs inside backlogActions.getProjectTask().try.api.get.catch(err)");
            console.log(err); 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.push("/dashboard");
        })
    } catch (error) {
        console.log("An error occurs inside backlogActions.getProjectTask().catch(err)");
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
        history.push("/dashboard");
    }
}
export const updateProjectTask=(backlog_id,pt_id,project_task,history)=>async dispatch=>{
    try {
        await api.patch(`/api/backlog/updateProjectTask/${backlog_id}/${pt_id}`,project_task)
        .then((res)=>{
            if(res.data){
                dispatch({
                    type: CLEAR_ERRORS
                });
                history.push(`/projectBoard/${backlog_id}`)
            }
        })
        .catch((err)=>{
            console.log("An error occurs inside backlogActions.updateProjectTask().try.api.patch.catch(err)");
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
    } catch (error) {
        console.log("An error occurs inside backlogActions.updateProjectTask().catch(err)");
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}
export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
    if (
      window.confirm(
        `You are deleting project task ${pt_id}, this action cannot be undone`
      )
    ) {
      await api.delete(`/api/backlog/deleteProjectTask/${backlog_id}/${pt_id}`)
      .then((res)=>{
          if(res){
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: pt_id
            });
          }
      })
      .catch((err)=>{
        console.log("An error occurs inside backlogActions.deleteProjectTask().try.api.get.catch(err)");
        console.log(err); 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    })
    }
};