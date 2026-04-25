import React,{useState,useEffect} from "react";

const ThemeToggle=()=>{

const [dark,setDark]=useState(true);

useEffect(()=>{
document.body.classList.toggle(
"light-mode",
!dark
)
},[dark]);

return(
<button
onClick={()=>setDark(!dark)}
className="register-btn"
>
{dark ? "Light" : "Dark"}
</button>
)

}

export default ThemeToggle;