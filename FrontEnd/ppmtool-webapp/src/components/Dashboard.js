import React, { Component } from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from "./Project/CreateProjectButton";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjects} from "../actions/projectActions";

export class Dashboard extends Component {

    componentDidMount=async()=>{
        await this.props.getProjects();
    }

    render() {
        return (
            <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br />
                        <CreateProjectButton/>
                        <br />
                        <hr />

                        <div className="container">
                            {(this.props.projects.projects!=='')?this.props.projects.projects.map((project)=>{
                                return(
                                    <ProjectItem  key={project.id} project={project}/>
                                )
                            }):''}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
Dashboard.propTypes={
    projects:PropTypes.object.isRequired,
    getProjects:PropTypes.func.isRequired
}
const mapStateToProps=state=>({ 
    projects:state.projects
})
export default connect(mapStateToProps,{getProjects})(Dashboard);