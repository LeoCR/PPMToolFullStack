import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route,Switch } from "react-router-dom"
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/> 
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/add-project" exact component={AddProject}/>
            <Route exact path="/updateProject/:id" component={UpdateProject} />
        </Switch> 
      </Router>
    </Provider>
  );
}

export default App;
