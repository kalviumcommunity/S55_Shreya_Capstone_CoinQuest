import React from "react";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

const SpendingChart=({data})=>{

return(
<div className="glass" style={{
padding:"30px",
marginBottom:"30px"
}}>

<h3 style={{marginBottom:"25px"}}>
Spending Overview
</h3>

<div style={{height:"320px"}}>

<ResponsiveContainer width="100%" height="100%">
<BarChart data={data}>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="amount"/>
</BarChart>
</ResponsiveContainer>

</div>

</div>
)

}

export default SpendingChart;