import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions";

class AddProject extends Component{
    constructor(){
        super();
        this.state={ 
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=async(e)=>{
        e.preventDefault();
        const newProject={
            projectName: this.state.projectName,
            projectIdentifier:  this.state.projectIdentifier,
            description:this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        console.log(newProject);
        await this.props.createProject(newProject, this.props.history); 
    }  
     static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
            return ({ errors: nextProps.errors  }) // <- this is setState equivalent
        }
        return null
    } 
    render(){
        const { errors } = this.state;
        return(
            <React.Fragment>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg " placeholder="Project Name" name="projectName" value={this.state.projectName} onChange={(e)=>this.onChange(e)}/>
                                        {(errors.projectName!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.projectName}</p>:''}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID" name="projectIdentifier"  value={this.state.projectIdentifier}  onChange={(e)=>this.onChange(e)}/>
                                        {(errors.projectIdentifier!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.projectIdentifier}</p>:''}
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" placeholder="Project Description" name="description" value={this.state.description}  onChange={(e)=>this.onChange(e)}></textarea>
                                        {(errors.description!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.description}</p>:''}
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="start_date" value={this.state.start_date}  onChange={(e)=>this.onChange(e)}/>
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="end_date"  value={this.state.end_date}  onChange={(e)=>this.onChange(e)}/>
                                    </div> 
                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
AddProject.propTypes={
    createProject:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    errors:state.errors,
    projects:state.projects
})
export default connect(mapStateToProps,{createProject}) (AddProject)