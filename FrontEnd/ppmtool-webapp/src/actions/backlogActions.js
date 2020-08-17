import api from '../api/api';
import {GET_BACKLOG,GET_PROJECT_TASK,DELETE_PROJECT_TASK} from "../constants/backlogTypes";
import { GET_ERRORS } from '../constants/errorTypes';

export const addProjectTask=(backlog_id,project_task,history)=> async dispatch=>{
    try {
        await api.post(`/api/backlog/create/${backlog_id}`,project_task)
        .then((res)=>{
            if(res.data!==null){
                dispatch({
                    type: GET_ERRORS,
                    payload: null
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