import React from 'react';
import Dashboard from './components/Dashboard';
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import Header from './components/Layout/Header';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route,Switch } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store";
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/> 
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/addProject" exact component={AddProject}/>
            <Route path="/updateProject/:id" exact component={UpdateProject} />
            <Route path="/projectBoard/:id" exact component={ProjectBoard}/>
            <Route path="/addProjectTask/:id" component={AddProjectTask}/>
        </Switch> 
      </Router>
    </Provider>
  );
}
export default App;
