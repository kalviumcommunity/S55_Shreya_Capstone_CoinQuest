import React from "react";
import AuthForm from "./AuthForm";

const Login=()=>{
return(
<div className="hero-container">
<AuthForm isLogin={true}/>
</div>
)
}

export default Login;