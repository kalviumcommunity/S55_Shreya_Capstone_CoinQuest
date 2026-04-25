import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");

const navigate=useNavigate();

const handleSubmit=async(e)=>{
e.preventDefault();
setError("");

try{

const url=isLogin
? "http://localhost:3000/login"
: "http://localhost:3000/register";

const res=await axios.post(
url,
{
username,
password
}
);

if(isLogin){
localStorage.setItem("token",res.data.token);
navigate("/dashboard");
}
else{
alert("Registered successfully");
navigate("/login");
}

}
catch(err){
setError(
err.response?.data?.error || "Authentication failed"
);
}
};

return(
<div className="hero-container">
<div className="hero-auth glass">

<form
onSubmit={handleSubmit}
className="auth-form"
>

<h1>
{isLogin ? "Welcome Back" : "Create Account"}
</h1>

{error && (
<p style={{color:"#ef4444"}}>
{error}
</p>
)}

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
{isLogin ? "Login" : "Register"}
</button>

<p>
{
isLogin
?
<>New here? <Link to="/register">Register</Link></>
:
<>Already have account? <Link to="/login">Login</Link></>
}
</p>

</form>

</div>
</div>
)

};

export default AuthForm;