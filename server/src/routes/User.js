import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usermodel } from '../model/user.js';




const router = express.Router();

router.post("/register", async (req, res)=>{
    const {username, password} = req.body;
    const user = await Usermodel.findOne({username});
if(user){
    return res.json({message:"User already exist"});
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({username, password: hashedPassword});
    await newUser.save();
    
    res.json({message: "User Resgitered Sucessfully"});

});



router.post("/login", async (req,res)=>{
    const {username, password} = req.body;
    const user = await Usermodel.findOne({username});

    if(!user) {
       return res.status(400).json({message: "User Doesnt exist "})
    }

    console.log('user1',user);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`isPasswordValid ${isPasswordValid} password:${password} user.password:${user.password}`)       
    if(!isPasswordValid){
        return res.status(401).json({message:"Username or Password Is Incorrect"});

    }

    const token= jwt.sign({ id: user._id}, "secret");
     return res.status(200).json({ token, userID: user._id});


});


export {router as userRouter};

export const verifyToken =(req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret",(err) =>{
           if (err){
             return res.sendStatus(403);
           }
        next();
    });

    } else {
        res.sendStatus(401);
    }


};