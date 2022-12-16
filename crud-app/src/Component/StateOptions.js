import { useState } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core';
const stateOptions=[
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]
const StateOptions = ({ state,setState }) => {
    return (
        <>
            <select placeholder='state' value={state} onChange={(e)=>{setState(e.target.value)}}>
                {
                    stateOptions.map((s)=>{
                        return(<option value={s}>{s}</option>)
                    })
                }
            </select>
            <br></br><br></br><br></br><br></br><br></br>
            <Typography variant='h4'>
                {state===''?'Watch COVID Cases in your State':state}
                
            </Typography>
            <br></br><br></br>
        </>
    )
}

export default StateOptions


