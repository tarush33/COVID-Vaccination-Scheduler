import axios from 'axios';
import { useState, useEffect } from 'react'
import { FormGroup, FormControl, InputLabel, 
         Input, Button, makeStyles, Typography,
         Checkbox,FormControlLabel,Table} from '@material-ui/core';
import AllUsers from './AllUsers';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    },
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const initialValue = {
    name: '',
    username: '',
    first_dose: false,
    second_dose:false,
    vaccinationCenter:'',
    state:'',
    phone: ''
}


const AddUser = () => {
    const [users,setUsers]=useState([])
    const [user, setUser] = useState(initialValue);
    const { name, username, first_dose,second_dose,vaccinationCenter,state,phone } = user;
    const [pin,setPin]=useState('')
    const [date,setDate]=useState('')
    const [slots, setSlots] = useState([])
    const [url,setUrl]=useState(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
    const handlePin=(e)=>{
        setPin(e.target.value)
    }
    const handleDate=(e)=>{
        console.log(e.target.value)
        const formattedDate=e.target.value.split('-').reverse().join('-')
        setDate(formattedDate)
        // setDate(e.target.value)
    }
    const handleButton=()=>{
        setUrl(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
        setUser({...user, ['date']: date})
    }

    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res.data.sessions)
            setSlots(res.data.sessions)
        }).catch((err) => {
            console.log(err)
        })
    }, [url])




    const classes = useStyles();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleCheckEvent=(e)=>{
        setUser({...user, [e.target.name]: e.target.checked})
    }
  
    const addUserDetails=()=>{
        axios.post('http://localhost:5000/add-newuser',user).then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err)
        })
        console.log(slots)
        console.log(user)
        setUsers([...users,user])
        setPin('')
        setDate('')
        setSlots([])
        setUrl(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
        setUser(initialValue)
    }

    return (
        <>
            <FormGroup className={classes.container} >
                <Typography variant="h4">Add User</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input required onChange={(e) => onValueChange(e)} 
                           name='name' 
                           value={name} id="my-input" />
                </FormControl>
                {/* <FormControl>
                    <InputLabel htmlFor="my-input">Username</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
                </FormControl> */}
                <FormControl>
                    <FormControlLabel name="first_dose" 
                                      control={<Checkbox checked={first_dose} 
                                      onChange={(e) => handleCheckEvent(e)}/>} 
                                      label="First Dose" />


                    <FormControlLabel name="second_dose" 
                                      control={<Checkbox disabled={first_dose?false:true} checked={second_dose} 
                                      onChange={(e) => handleCheckEvent(e)}/>} 
                                      label="Second Dose" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input required onChange={(e) => onValueChange(e)} 
                           name='phone' 
                           value={phone} 
                           id="my-input" />
                </FormControl>
                <br></br>
                <FormControl>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{display:'block', alignItems:'center',justifyContent:'center'}}>
                            <label>State</label>
                            <br/>
                            <input type="text" 
                                   name="state" 
                                   required
                                   placeholder="Enter state" 
                                   onChange={(e)=>onValueChange(e)} 
                                   value={state}/>
                        </div>
                        <div style={{display:'block', alignItems:'center',justifyContent:'center'}}>
                            <label>Enter Pincode</label>
                            <br/>
                            <input type="number" 
                                   value={pin} 
                                   name="pin-code" 
                                   required
                                   placeholder="Enter pincode" 
                                   disabled={first_dose && second_dose?true:false}
                                   onChange={handlePin}/>
                        </div>
                        <div style={{display:'block', alignItems:'center',justifyContent:'center'}}>
                            <label>Enter Date of Booking</label>
                            <br/>
                            <input type="date" 
                                   name="date" 
                                   value={date} 
                                   required
                                   placeholder="Enter Date" 
                                   disabled={first_dose && second_dose?true:false}
                                   onChange={handleDate}/>
                        </div>
                    </div>
                </FormControl>
                <Button variant="contained" 
                        disabled={pin==''||date==''?true:false}
                        onClick={handleButton}>Book Slot</Button>
                
                <select placeholder='Choose Slot' 
                        value={vaccinationCenter} 
                        name='vaccinationCenter'
                        disabled={pin===''||date===''?true:false}
                        onChange={(e)=>onValueChange(e)}>
                    
                    {
                        slots.map((slot)=>{
                            return(
                                <option value={slot.name}>{slot.name}</option>
                            )
                        })
                    }

                </select>

                <br></br>
                <FormControl>
                    <Button variant="contained" 
                            onClick={() => addUserDetails()} 
                            style={{backgroundColor:'green',color:'white'}}>Add User</Button>
                </FormControl>
            </FormGroup>


            <br></br><br></br><br></br><br></br>

            
            <Table className={classes.table}>
                <AllUsers 
                    users={users}
                    setUsers={setUsers}
                />
            </Table>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
        </>
    )
}

export default AddUser;