import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import Header from './components/Header';
import About from './pages/About';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import ViewUser from './pages/ViewUser';
  const App = () =>{
  return (
    <BrowserRouter>
     <div className='App'>
      <Header/>
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/add_user" component={AddUser}/>
        <Route exact path="/edit_user/:id" component={EditUser}/>
        <Route exact path="/api/users/:id" component={ViewUser}/>
        <Route exact path="/about" component={About}/>
      </Switch>
      
    </div>
    </BrowserRouter>
   
  );
}
export default App;
