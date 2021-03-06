import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProject} from "../../actions/projectActions";
import {clearErrors} from "../../actions/errorsActions";
export class ProjectItem extends Component {

    onDelete=(e,id)=>{
        if(e){
            e.preventDefault();
        }
        this.props.deleteProject(id);
    }
    render() {
        const {project}=this.props;
        return (
            <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <span className="mx-auto">{project.projectIdentifier}</span>
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{project.projectName}</h3>
                    <p>{project.description}</p>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                    <div className="list-group">
                        <Link to={`/projectBoard/${project.projectIdentifier}`} onClick={()=>this.props.clearErrors()}>
                            <li className="list-group-item board">
                                <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                            </li>
                        </Link>
                        <Link to={`/updateProject/${project.projectIdentifier}`}>
                            <li className="list-group-item update">
                                <i className="fa fa-edit pr-1"> Update Project Info</i>
                            </li>
                        </Link> 
                            <li className="list-group-item delete" onClick={(e)=>this.onDelete(e,project.projectIdentifier)}>
                                <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                            </li> 
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
ProjectItem.propTypes={
    deleteProject:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired
}
export default connect(null,{deleteProject,clearErrors})(ProjectItem)