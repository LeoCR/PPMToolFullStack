import {ADD_PROJECT} from "../constants/projectTypes";

const initialState={
    projects:[]
};
export default function(state=initialState,action){
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state, 
                projects:[...state.projects,action.payload]
        } 
    
        default:
            return state; 
    }
}