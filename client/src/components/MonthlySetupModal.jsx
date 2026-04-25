import React,{useState} from "react";

const MonthlySetupModal=({onClose})=>{

const [income,setIncome]=useState("");

return(
<div className="overlay">
<div className="modal glass">

<h2>Monthly Setup</h2>

<input
placeholder="Monthly Income"
value={income}
onChange={(e)=>setIncome(e.target.value)}
/>

<button onClick={onClose}>
Save Setup
</button>

</div>
</div>
)

}

export default MonthlySetupModal;