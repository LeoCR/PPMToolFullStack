import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { clearErrors } from "../../actions/errorsActions";
import Backlog from './Backlog';
import {getBacklog} from "../../actions/backlogActions";

class ProjectBoard extends React.PureComponent {

    constructor(){
        super();
        this.state={
            errors:{ 
            }
        }
    }
    static getDerivedStateFromProps(nextProps) {
        if(nextProps.errors){
            return({
                errors:nextProps.errors
            })
        }
    }
    componentDidMount=async()=>{
        const {id} = this.props.match.params;
        await this.props.getBacklog(id);
    }
    render() {
        const {id}=this.props.match.params;
        const { project_tasks } = this.props.backlog;
        const {errors}=this.state;
        let BoardContent;

        const boardAlgorithm=(errors,project_tasks)=>{
            if(project_tasks.length<1){
                if(errors.projectNotFound){
                    return(
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    )
                }else{
                    return(
                        <div className="alert alert-info text-center" role="alert">
                            No Project Tasks on this board
                        </div>
                    )
                }
            }
            else{
                return(
                    <Backlog project_tasks_prop={project_tasks} />
                )
            }
        }
        BoardContent=boardAlgorithm(errors,project_tasks);
        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3" onClick={()=>this.props.clearErrors()}>
                    <i className="fas fa-plus-circle"> </i>
                    Create Project Task
                </Link>
                <br />
                <hr />
                {
                    BoardContent
                }
            </div>
        );
    }
}
ProjectBoard.propTypes = { 
    clearErrors: PropTypes.func.isRequired,
    getBacklog: PropTypes.func.isRequired,
    backlog:PropTypes.object.isRequired,
    errors:PropTypes.object
  };
const mapStateToProps = (state) => ({
    errors: state.errors,
    backlog:state.backlog
});
export default connect(mapStateToProps, {clearErrors,getBacklog})(ProjectBoard)