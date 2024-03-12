const express = require('express')
const cors = require('cors')
const User = require('./db/user.js')
require('./db/dbConfig.js')

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
    if(req.body.name && req.body.email && req.body.password){
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

app.listen(8000)