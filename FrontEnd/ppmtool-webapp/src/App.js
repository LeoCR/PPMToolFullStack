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

function App() {
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
            
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/addProject" exact component={AddProject}/>
            <Route path="/updateProject/:id" exact component={UpdateProject} />
            <Route path="/projectBoard/:id" exact component={ProjectBoard}/>
            <Route path="/addProjectTask/:id" component={AddProjectTask}/>
            <Route path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
        </Switch> 
      </Router>
    </Provider>
  );
}
export default App;
