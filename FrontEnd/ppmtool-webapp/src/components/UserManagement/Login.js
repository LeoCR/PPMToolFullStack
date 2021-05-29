import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import { clearErrors } from "../../actions/errorsActions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "userinvited@gmail.com",
            password: "password1234",
            errors: {}
        };
    }
    onSubmitLoginForm=(e)=>{
        if(e){
            e.preventDefault();
        } 
        const LoginRequest={
            username:this.state.username,
            password:this.state.password
        } 
        this.props.login(LoginRequest);
    }
    componentDidMount(){
        this.props.clearErrors();        
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
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
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
          return { errors: nextProps.errors }; // <- this is setState equivalent
        }
        return null;
    } 
    componentDidUpdate(prevProps) {
        if(this.props.security.validToken&& !prevProps.security.validToken){
            this.props.history.push("/dashboard");
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmitLoginForm}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg ${errors.username ===undefined?'':' is-invalid'}`}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
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
                                    <input
                                        type="password"
                                        className={`form-control form-control-lg ${errors.password ===undefined?'':' is-invalid'}`}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password !== "" ? (
                                        <p style={{ color: "darkred", fontSize: "12px" }}>
                                            {errors.password}
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
Login.propTypes={
    errors:PropTypes.object.isRequired,
    login:PropTypes.func.isRequired,
    security:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    security:state.security,
    errors:state.errors
})
export default connect(mapStateToProps,{login,clearErrors})(Login);
