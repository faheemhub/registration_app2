import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';

function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path = '/' element = {<Login/>}/>
      <Route exact path = '/signup' element = {<Signup/>}/>
      <Route exact path = '/home' element = {<Home/>}/>
      <Route exact path = '/profile' element = {<Profile/>}/>
      <Route exact path = '/settings' element = {<Settings/>}/>
      <Route exact path = '/logout' element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

