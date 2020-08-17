import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { clearErrors } from "../../actions/errorsActions";
import Backlog from './Backlog';
import {getBacklog} from "../../actions/backlogActions";

class ProjectBoard extends React.PureComponent {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }
    render() {
        const {id}=this.props.match.params;
        const { project_tasks } = this.props.backlog;
        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3" onClick={()=>this.props.clearErrors()}>
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                <Backlog project_tasks_prop={project_tasks} />
            </div>
        );
    }
}
ProjectBoard.propTypes = { 
    clearErrors: PropTypes.func.isRequired,
    getBacklog: PropTypes.func.isRequired,
    backlog:PropTypes.object.isRequired
  };
const mapStateToProps = (state) => ({
    errors: state.errors,
    backlog:state.backlog
});
export default connect(mapStateToProps, {clearErrors,getBacklog})(ProjectBoard)