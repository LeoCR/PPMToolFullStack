import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {clearErrors} from "../../actions/errorsActions";
export const CreateProjectButton=(props)=>{
    return(
        <React.Fragment>
            <Link to="/addProject" className="btn btn-lg btn-info" onClick={()=>props.clearErrors()}>
                Create a Project
            </Link>
        </React.Fragment>
    )
}
const mapStateToProps=(state)=>({
    errors:state.errors
})
export default connect(mapStateToProps,{clearErrors})(CreateProjectButton);