const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const User = require('./db/user.js')
const Otp = require('./db/otp.js')
require('./db/dbConfig.js')
const otpGenerator = require('otp-generator')

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', async(req,res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select('-password');
        if(user){
        res.send(user);
        }else{
            res.send(JSON.stringify({message:"Username or Password is incorrect!"}))
        }
    }else{
        res.send(JSON.stringify({message:"Username or Password is incorrect!"}))
    }    
})
app.post('/signup', async(req,res)=>{
    if(req.body.email && req.body.password){
        let {email} = req.body;
        let user = await User.find({email});
        if(user.length){
            res.send({message:"User already exists!"})
        }else{
            let result = new User(req.body);
            result = await result.save();
            result = result.toObject();
            delete result.password;
            res.send(result)
        }
    }else{
        res.send({message:"Please fill complete details"})
    }
})
app.post('/sendOtp', async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    console.log(user)
    if(user){
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const otpBody = {
            email:req.body.email,
            otpVal:otp
        }
        let otpUser = await Otp.findOne({email:user.email});
        if(otpUser){
            await Otp.updateOne(
                {email:otpUser.email},
                {
                    $set:{otpVal:otp}
                }
            )
        }else{
            let otpData = new Otp(otpBody);
            let result = await otpData.save();
        }
    const transporter = await nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'truecolumn20@gmail.com',
            pass:'hkov bwja xegw wxyt',
    
        }
    });
    const mailOptions = {
        from:"truecolumn20@gmail.com",
        to:req.body.email,
        subject:"this is a test mail",
        text:otp
    }
    await transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log('email has been sent')
            res.send({success:true})
        }
    });
    // res.send({success:true})
}
else{
    res.send({message:"user not found"})
}
})

app.post('/validateOtp', async(req,res)=>{
    if(req.body.email && req.body.otpVal){
        console.log(req.body)
        let user = await Otp.findOne(req.body);
        if(user){
        res.send(user);
        }else{
            res.send(JSON.stringify({message:"Email or OTP is incorrect!"}))
        }
    }else{
        res.send(JSON.stringify({message:"Email or OTP is incorrect!"}))
    }  
})
app.post('/resetPassword', async(req,res)=>{
    console.log(req.body)
            let newPassword = await User.updateOne(
                {email:req.body.otpEmail},
                {
                    $set:req.body
                }
            );
            if(newPassword.acknowledged === true){
                res.send(newPassword);
                // res.send({success:true, message:"Password updated successfully"})
            }else{
            res.send(JSON.stringify({message:"Oops! Something went wrong!"}))
        }
    }
)
app.listen(8000)