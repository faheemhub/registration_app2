import { useState } from 'react'
import './forgotPassword.css'
import { useNavigate } from 'react-router-dom';

function ForgotPassword(){
    const [otpEmail, setOtpEmail] = useState();
    const [disableEmailField, setDisableEmailField] = useState(false);
    const [otpValue, setOtpValue] = useState();
    const [validateOtp, setValidateOtp] = useState(false);
    const [disableOtpField, setDisableOtpField] = useState(false);
    const [mess, setMess] = useState(false);
    const [resetPass, setResetPass] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    const handleOtp = async(e) => {
        e.preventDefault();
        alert('Please wait for a while...')
        let result = await fetch('http://127.0.0.1:8000/sendOtp',{
            method:'post',
            body:JSON.stringify({email:otpEmail}),
            headers:{'Content-Type':'application/json'}
        })
        result = await result.json();
        if(result.success === true){
            setMess(true)
            setDisableEmailField(true)
        }
    }
    const handleValidateOtp = async(e) => {
        e.preventDefault();
        let result = await fetch('http://127.0.0.1:8000/validateOtp',{
            method:'post',
            body:JSON.stringify({otpEmail, otpValue}),
            headers:{'Content-Type':'application/json'}
        })
        result = await result.json();
        if(result){
            setResetPass(true)
            setDisableOtpField(true)
        }else{
            setValidateOtp(true)
        }
    }
    const resetPassword = async(e) => {
        e.preventDefault();
        if(password === confirmPassword){
        let result = await fetch('http://127.0.0.1:8000/resetPassword',{
            method:'post',
            body:JSON.stringify({otpEmail, password}),
            headers:{'Content-Type':'application/json'}
        })
        result = await result.json();
        console.log(result)
        if(result.acknowledged === true){
            alert('Password updated Successfully')
            navigate('/')
        }
    }else{
        alert('Password and Confirm Password does not match!')
    }
    }
    return(
        <div className='outer'>
            <div className='inner'>
            <h1>Reset Password</h1>
                Email:<br/>
                <input type='email' placeholder = 'Enter Email'
                    onChange={(e)=>setOtpEmail(e.target.value)}
                    disabled = {disableEmailField === true ? true : false}
                />
                <br/>
                <button id='sendOtp' onClick={handleOtp}
                    disabled = {disableEmailField === true ? true : false}
                >Send OTP</button>
                <br/>
                {mess && <p style={{color:'green'}}>
                OTP sent successfully!
                Please check your email for OTP!
                </p>}
                Enter OTP:<br/>
                <input onChange={(e)=>setOtpValue(e.target.value)}
                    disabled = {disableOtpField === true ? true : false}
                /><br/>
                {validateOtp && <p style={{color:'red'}}>Please enter a valid OTP!</p>}
                <button disabled={!otpValue || (disableOtpField === true ? true : false)}
                    id='enterOtp' onClick={handleValidateOtp}>Validate OTP</button>
                <br/>
                <br/>
                {resetPass && 
                <div>
                New-Password:<br/>
                <input placeholder = 'Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <br/>
                Confirm Password:<br/>
                <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/><br/>
                <button onClick={resetPassword}>Reset Password</button>
                </div>}
            </div>
        </div>
    )
}

export default ForgotPassword