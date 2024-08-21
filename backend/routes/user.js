const express = require("express");

const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const {Account} = require("../db");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");
console.log("Inside user js");
const signupSchema = zod.object({
    username: zod.string().email(),
    password:  zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})


router.post("/signup",async(req,res)=>{
    const body=req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if(user){
        return res.json({
          message: "Email already taken / Incorrect inputs",
        });
    }
    const dbUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const userId=dbUser._id;

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.json({
        message:"User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password:zod.string()
})
router.post("/sign",async (req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }
    const user = await User.findOne({
        username:body.username,
        password:req.body.password
    });
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return ;
    }
    res.status(411).json({
      message: "Error while logging in",
    });
})

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})
router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
          message: "Error while updating information",
        });
    }
    await User.updateOne({_id:req.userId},req.body);
    return res.json({
        message:"Updatedd successfully"
    })
})

router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastname:user.lastName,
            _id:user._id
        }))
    })
})
module.exports=router;