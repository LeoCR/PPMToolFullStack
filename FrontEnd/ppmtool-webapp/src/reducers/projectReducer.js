import {ADD_PROJECT,GET_PROJECTS,GET_PROJECT} from "../constants/projectTypes";

const initialState={
    projects:[],
    project:{}
};
export default function(state=initialState,action){
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state, 
                projects:[...state.projects,action.payload]
        } 
        case GET_PROJECTS:
            return {
                ...state,
                projects:action.payload
            }
        case GET_PROJECT:
            return {
                ...state,
                project:action.payload
            }
        default:
            return state; 
    }
}