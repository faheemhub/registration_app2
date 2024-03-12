import React, { useState } from "react";
import './Auth.css'
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
    const [isSignup, setIsSignup] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let result = await fetch('http://127.0.0.1:8000/signup',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{"Content-Type":"application/json"}
        });
        result = await result.json();
        if(result._id){
            navigate('/home')
        }
    }
    return(
        <div className="auth-div">
        <div className="auth-container">
        <form onSubmit={handleSubmit}>
        <h1 style={{color:"rgb(132,3,207)"}}>Welcome Visitors!</h1>
        <label htmlFor="fullname">
            <h4>Full Name</h4>
            <input type="text" name="fullname" required onChange={e=>setName(e.target.value)}/>
        </label>
        <label>
            <h4>Email</h4>
            <input type="email" name="email" required onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label>
        <div style = {{display:"flex", justifyContent:"space-between"}}>
            <h4>Password</h4>
        </div>
            <input type="password" name="password" required onChange={e=>setPassword(e.target.value)}/>
        </label>
        <button type="submit" className="submit-button">
        Sign Up
        </button>
        </form>
        <p>Already have an account?
        <Link to = '/'><button className="switch-button">Login</button></Link>
        </p>
        </div>
        </div>
    )
}

export default Signup