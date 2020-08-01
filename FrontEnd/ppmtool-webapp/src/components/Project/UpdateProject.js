import React, { Component } from "react";
import {getProject,updateProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

export class UpdateProject extends Component {
    constructor(){
        super();
        this.state={ 
            id:"",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "", 
            errors: {}
        }; 
    }
    onChange=(e)=>{ 
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        const {id}= this.props.match.params; 
        this.props.getProject(id,this.props.history)
    }

    onUpdateProject=async(e)=>{
        if(e){
            e.preventDefault();
        }
        const editedProject={
            id:this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
        } 
        await this.props.updateProject(editedProject, this.props.history);
    } 
    
    componentWillReceiveProps(nextProps){
        const {id, projectName, projectIdentifier, description, start_date, end_date}=nextProps.projects.project;
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors  }) 
        }
        this.setState({
            id, projectName, projectIdentifier, description, start_date, end_date
        }) 
    }
    
  render() {
    const {projectName,projectIdentifier,description,start_date,end_date,errors}=this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onUpdateProject}>
                <div className="form-group">
                  <input
                    type="text"
                    className={(errors.projectName!=='')?"form-control form-control-lg":"form-control form-control-lg  is-invalid"}
                    placeholder="Project Name"
                    name="projectName" 
                    value={projectName} 
                    onChange={this.onChange} 
                  />
                  {(errors.projectName!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.projectName}</p>:''}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    disabled
                    name="projectIdentifier"  
                    value={projectIdentifier}  
                    onChange={this.onChange} 
                  />
                  {(errors.projectIdentifier!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.projectIdentifier}</p>:''}
                </div>
                <div className="form-group">
                  <textarea
                    className={(errors.description!=='')?"form-control form-control-lg ":"form-control form-control-lg is-invalid"}
                    placeholder="Project Description"
                    name="description" value={description} 
                    onChange={this.onChange}  
                  />
                  {(errors.description!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.description}</p>:''}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg" 
                    name="start_date" value={start_date} 
                    onChange={this.onChange}   
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg" 
                    name="end_date"  value={end_date}  
                    onChange={this.onChange} 
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UpdateProject.propTypes={
    getProject:PropTypes.func.isRequired,
    updateProject:PropTypes.func.isRequired,
    project:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    projects:state.projects,
    project:state.projects.project,
    errors:state.errors
})
export default connect(mapStateToProps,{getProject,updateProject})(UpdateProject)