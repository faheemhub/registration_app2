import React, { useState } from "react";
import './Auth.css'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignup, setIsSignup] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let result = await fetch('http://127.0.0.1:8000/',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        });
        result = await result.json();
           if(result.message){
            alert(result.message)
           }else{
            navigate('/home')
           }
    }
    return(
        <div className="auth-div">
        <div className="auth-container">
        <form onSubmit={handleSubmit}>
        <h1 style={{color:"rgb(132,3,207)"}}>Welcome Visitors!</h1>

        <label>
            <h4>Email</h4>
            <input type="email" name="email" required onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label>
        <div style = {{display:"flex", justifyContent:"space-between"}}>
            <h4>Password</h4>
            {!isSignup && (<Link to = '/forgotpassword' style = {{color:"blue", marginTop:'20px', textDecoration:'none'}}>forgot password?</Link>)}
        </div>
            <input type="password" name="password" required onChange={e=>setPassword(e.target.value)}/>
        </label>
        <button type="submit" className="submit-button">Log In</button>
        </form>
        <p>Don't have an account?
        <Link to = '/signup'><button className="switch-button">Sign Up</button></Link>
        </p>
        </div>
        </div>
    )
}

export default Login