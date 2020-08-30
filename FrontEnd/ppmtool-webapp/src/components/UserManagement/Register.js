import React from 'react';
import {createNewUser} from "../../actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { clearErrors } from "../../actions/errorsActions";

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors:{}
        }
    }
    onChange=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmitRegisterForm=(e)=>{
        if(e){
            e.preventDefault();
        }
        const newUser={
            username:this.state.username,
            fullName:this.state.fullName,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
        };
        this.props.createNewUser(newUser,this.props.history);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
          return { errors: nextProps.errors }; // <- this is setState equivalent
        }
        return null;
    } 
    componentDidMount(){
        this.props.clearErrors();
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmitRegisterForm}>
                                <div className="form-group">
                                    <input type="text" 
                                        className={`form-control form-control-lg ${errors.fullName ===undefined?'':' is-invalid'}`}
                                        placeholder="Full Name" 
                                        name="fullName"
                                        onChange={this.onChange}
                                        value={this.state.fullName}
                                    />
                                    {errors.fullName !== "" ? (
                                        <p style={{ color: "darkred", fontSize: "12px" }}>
                                            {errors.fullName}
                                        </p>
                                        ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" 
                                        className={`form-control form-control-lg ${errors.username ===undefined?'':' is-invalid'}`}
                                        placeholder="Email Address (Username)" 
                                        name="username" 
                                        onChange={this.onChange}
                                        value={this.state.username}
                                    />
                                    {errors.username !== "" ? (
                                        <p style={{ color: "darkred", fontSize: "12px" }}>
                                            {errors.username}
                                        </p>
                                        ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" 
                                        className={`form-control form-control-lg ${errors.password ===undefined?'':' is-invalid'}`}
                                        placeholder="Password" 
                                        name="password" 
                                        onChange={this.onChange}
                                        value={this.state.password}
                                    />
                                    {errors.password !== "" ? (
                                        <p style={{ color: "darkred", fontSize: "12px" }}>
                                            {errors.password}
                                        </p>
                                        ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" 
                                        className={`form-control form-control-lg ${errors.confirmPassword ===undefined?'':' is-invalid'}`} 
                                        placeholder="Confirm Password"
                                        name="confirmPassword" 
                                        onChange={this.onChange}
                                        value={this.state.confirmPassword}
                                    />
                                    {errors.confirmPassword !== "" ? (
                                        <p style={{ color: "darkred", fontSize: "12px" }}>
                                            {errors.confirmPassword}
                                        </p>
                                        ) : (
                                        ""
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes={
    clearErrors:PropTypes.func.isRequired,
    createNewUser:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    errors:state.errors
})
export default connect(mapStateToProps,{createNewUser,clearErrors})(Register)