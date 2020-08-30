import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route,Switch } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store";
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Dashboard from './components/Dashboard';
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import Header from './components/Layout/Header';
import Login from './components/UserManagement/Login';
import Register from './components/UserManagement/Register';
import jwt_decode from "jwt-decode";
import {setJWTToken} from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from './constants/securityTypes';
import {logout} from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
const jwtToken=localStorage.getItem('jwtToken');

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwtToken=jwt_decode(jwtToken);
  store.dispatch({
    type:SET_CURRENT_USER,
    payload:decoded_jwtToken
  })
  const currentTime = Date.now()/1000;
  if(decoded_jwtToken.exp<currentTime){
      //handle the logout
      store.dispatch(
        logout()
      );
      window.location.href="/";
  }
}

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <Header/> 
          <Switch>
              {
                //public Routes
              }
              <Route path="/" exact component={Landing}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              {
                //private Routes
              }
              
              <SecuredRoute path="/dashboard" exact component={Dashboard}/>
              <SecuredRoute path="/addProject" exact component={AddProject}/>
              <SecuredRoute path="/updateProject/:id" exact component={UpdateProject} />
              <SecuredRoute path="/projectBoard/:id" exact component={ProjectBoard}/>
              <SecuredRoute path="/addProjectTask/:id" component={AddProjectTask}/>
              <SecuredRoute path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
          </Switch> 
        </Router>
      </Provider>
    );  
  }
}
export default App;
