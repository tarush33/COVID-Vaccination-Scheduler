import 'semantic-ui-css/semantic.min.css'
import { Grid, Input } from 'semantic-ui-react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import DrawTable from './DrawTable';
import NavBar from './NavBar';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  component: {
      margin: 50,
      '& > *': {
          marginTop: 20
      }
  },
  image: {
      width: '50%',
      height: '50%'
  }
})

const InputPin = () => {
    const classes = useStyles();
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
        setPin('')
        setDate('')
    }

    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res.data.sessions)
            setSlots(res.data.sessions)
        }).catch((err) => {
            console.log(err)
        })
    }, [url])
    
    return (
        <Box className={classes.component}>

          <div class="ui right action input">
            <input type="number" 
                  required
                  placeholder="Enter Pin Code" 
                  value={pin}
                  onChange={handlePin}/>
            <input type="date" 
                  required
                  placeholder="Enter Date" 
                  value={date}
                  onChange={handleDate}/>
            <button class="ui teal icon right labeled button"
                    onClick={handleButton}
                    >
                <i aria-hidden="true" class="search icon"></i>
                Search
            </button>
          </div>

          <br></br><br></br><br></br><br></br>

          <DrawTable slots={slots} />

          <br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br>
        </Box>
    )
}

export default InputPin