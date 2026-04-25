const express=require("express");
const router=express.Router();

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const User=require("./User");
const Category=require("./Category");
const Entry=require("./Entry");
const Budget=require("./Budget");

const SECRET_KEY=process.env.SECRET_KEY;


/* JWT */

const verifyToken=(req,res,next)=>{

const token=req.headers.authorization;

if(!token){
return res.status(403).json({
message:"Token required"
});
}

jwt.verify(
token.split(" ")[1],
SECRET_KEY,
(err,decoded)=>{

if(err){
return res.status(403).json({
message:"Invalid token"
});
}

req.userId=decoded.id;
next();

}
);

};



/* REGISTER */

router.post("/register",async(req,res)=>{

const name=
req.body.name ||
req.body.username;

const password=
req.body.password;

try{

if(!name || !password){
return res.status(400).json({
error:"Missing fields"
});
}

const existing=
await User.findOne({name});

if(existing){
return res.status(400).json({
error:"Username already exists"
});
}

const hashed=
await bcrypt.hash(
password,
10
);

const user=
new User({
name,
password:hashed
});

await user.save();

console.log(
"Registered:",
name
);

res.status(201).json({
message:"Registered successfully"
});

}
catch(err){

console.log(err);

res.status(500).json({
error:"Registration failed"
});

}

});



/* LOGIN FIXED */

router.post("/login",async(req,res)=>{

console.log(
"LOGIN BODY:",
req.body
);

const username=
req.body.username ||
req.body.name;

const password=
req.body.password;

try{

const user=
await User.findOne({
name:username
});

if(!user){

console.log(
"User not found:",
username
);

return res.status(400).json({
error:"User not found"
});

}

console.log(
"User found"
);

const valid=
await bcrypt.compare(
password,
user.password
);

if(!valid){

console.log(
"Password mismatch"
);

return res.status(400).json({
error:"Wrong password"
});

}

const token=
jwt.sign(
{id:user._id},
SECRET_KEY
);

console.log(
"Login success"
);

res.json({
token,
message:"Success"
});

}
catch(err){

console.log(
"LOGIN ERROR:",
err
);

res.status(500).json({
error:"Login error"
});

}

});



/* GET CATEGORIES */

router.get(
"/categories",
verifyToken,
async(req,res)=>{

try{

const categories=
await Category.find({
user:req.userId
});

res.json(categories);

}
catch(err){

res.status(500).json({
error:"Failed fetching categories"
});

}

}
);



/* ADD ENTRY */

router.post(
"/entries",
verifyToken,
async(req,res)=>{

const {
title,
amount,
date
}=req.body;

const categoryId=
req.body.categoryId ||
req.body.category;

try{

const entry=
new Entry({
user:req.userId,
title,
amount,
category:categoryId,
date:date || new Date()
});

await entry.save();

res.status(201).json(entry);

}
catch(err){

console.log(err);

res.status(500).json({
error:"Failed adding entry"
});

}

}
);



/* GET ENTRIES */

router.get(
"/entries",
verifyToken,
async(req,res)=>{

try{

const entries=
await Entry.find({
user:req.userId
});

res.json(entries);

}
catch(err){

res.status(500).json({
error:"Failed fetching entries"
});

}

}
);



/* BUDGETS */

router.post(
"/budgets",
verifyToken,
async(req,res)=>{

const {
categoryId,
month,
year,
amount
}=req.body;

try{

const budget=
await Budget.findOneAndUpdate(
{
user:req.userId,
category:categoryId,
month,
year
},
{
amount
},
{
new:true,
upsert:true
}
);

res.status(201).json(
budget
);

}
catch(err){

res.status(500).json({
error:"Budget error"
});

}

}
);



router.get(
"/budgets",
verifyToken,
async(req,res)=>{

try{

const budgets=
await Budget.find({
user:req.userId
});

res.json(
budgets
);

}
catch(err){

res.status(500).json({
error:"Failed fetching budgets"
});

}

}
);


module.exports=router;