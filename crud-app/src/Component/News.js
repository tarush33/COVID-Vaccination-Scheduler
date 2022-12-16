import axios from 'axios'
import { useState,useEffect } from 'react' 
import StateOptions from "./StateOptions"
import 'semantic-ui-css/semantic.min.css'
import { Grid } from 'semantic-ui-react'
 
const Home = () => {
    const [state,setState]=useState('')
    const [stateData,setStateData]=useState({})
    // const []
    const url='https://data.covid19india.org/state_district_wise.json'
    useEffect(() => {
        axios.get(url).then((res) => {
            const newData=res.data[state].districtData
            // console.log(newData)
            setStateData({...newData})
        }).catch((err) => {
            console.log(err)
        })
    },[state])
    
    return (
        <div>
            <StateOptions
                state={state}
                setState={setState}
            />
            {console.log(stateData)}
            {/* {
                Object.keys(stateData).forEach((key)=>{
                    console.log(key,stateData[key].active)
                })
            } */}
            <Grid celled padded>
                <Grid.Row color='teal' textAlign='center'>
                    <Grid.Column width={3}>District</Grid.Column>
                    <Grid.Column>Active cases</Grid.Column>
                    <Grid.Column>Confirmed Cases</Grid.Column>
                    <Grid.Column>Cases Deceased</Grid.Column>
                    <Grid.Column>Recovered</Grid.Column>
                </Grid.Row>

                {
                    Object.keys(stateData).map((key)=>{
                        // console.log(key,stateData[key].active)
                        return(
                            <Grid.Row>
                                <Grid.Column width={3}>{key}</Grid.Column>
                                <Grid.Column>{stateData[key].active}</Grid.Column>
                                <Grid.Column>{stateData[key].confirmed}</Grid.Column>
                                <Grid.Column>{stateData[key].deceased}</Grid.Column>
                                <Grid.Column>{stateData[key].recovered}</Grid.Column>
                            </Grid.Row>
                        )
                    })
                }
            </Grid>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
        </div>
    )
}

export default Home
