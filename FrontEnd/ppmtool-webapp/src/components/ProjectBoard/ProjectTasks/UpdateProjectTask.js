import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectTask, updateProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
export class UpdateProjectTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: "",
            created_At: "",
            errors: {},
        };
    }
    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
        setTimeout(() => {
            const { id, projectSequence, summary,
                acceptanceCriteria, status, priority,
                dueDate, projectIdentifier, created_At } =this.props.project_task;
                this.setState({ 
                    id, projectSequence, summary,
                    acceptanceCriteria, status, priority,
                    dueDate, projectIdentifier, created_At 
                })
        }, 500);
    } 
  onChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
  }
  static getDerivedStateFromProps(nextProps){ 
    if (nextProps.errors) {
      return({ errors: nextProps.errors  }) 
    }
  }
  onSubmit = async(e) => {
    if (e) {
      e.preventDefault();
    }
    const UpdatedProjectTask={
        id: this.state.id,
        projectSequence: this.state.projectSequence,
        summary: this.state.summary,
        acceptanceCriteria: this.state.acceptanceCriteria,
        status: this.state.status,
        priority: this.state.priority,
        dueDate: this.state.dueDate,
        projectIdentifier: this.state.projectIdentifier,
        created_At: this.state.created_At
    }
    //console.log(UpdatedProjectTask);
    await this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdatedProjectTask,
      this.props.history
    );
  };
  render() {
    const {errors}=this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">
                Update Project Task
              </h4>
              <p className="lead text-center">
                Project Name: {this.state.projectIdentifier} | Project Task ID :{" "}
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={(errors.summary===undefined)?"form-control form-control-lg":"form-control form-control-lg  is-invalid"}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {(errors.summary!=='')?<p style={{color:'darkred',fontSize:'12px'}}>{errors.summary}</p>:''}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    onChange={this.onChange}
                    value={this.state.acceptanceCriteria}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    onChange={this.onChange}
                    value={this.state.dueDate}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    onChange={this.onChange}
                    value={this.state.priority}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    onChange={this.onChange}
                    value={this.state.status}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
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
UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors:PropTypes.object
};
const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors:state.errors
});
export default connect(mapStateToProps, { getProjectTask,updateProjectTask })(UpdateProjectTask);
