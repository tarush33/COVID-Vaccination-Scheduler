import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
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
    }
})


const AllUsers = ({users,setUsers}) => {
    // const [users, setUsers] = useState([]);
    const classes = useStyles();
    useEffect(()=>{
        axios.get('http://localhost:5000/all-users').then((result)=>{
            console.log(result).catch((err)=>{
                console.log(err)
            })
        })
    },[])
    return(
        <Grid celled padded >
            <Grid.Row color='teal' textAlign='center'>
                <Grid.Column width={1}>Id</Grid.Column>
                <Grid.Column width={2}>Name</Grid.Column>
                <Grid.Column width={2}>State</Grid.Column>
                <Grid.Column width={2}>Vaccination Status</Grid.Column>
                <Grid.Column width={2}>Phone</Grid.Column>
                <Grid.Column width={5}>Center</Grid.Column>
                <Grid.Column width={2}>Date</Grid.Column>
            </Grid.Row>
            {
                users.map((user,index)=>{
                    const { name,username,first_dose,second_dose,vaccinationCenter,state,phone,date}=user
                    return(
                        <Grid.Row>
                            <Grid.Column width={1}>{index+1}</Grid.Column>
                            <Grid.Column width={2}>{name}</Grid.Column>
                            <Grid.Column width={2}>{state}</Grid.Column>
                            <Grid.Column width={2}>
                                {first_dose&&second_dose?'Vaccinated':(first_dose?'First Dose':'Not Vaccinated')}
                            </Grid.Column>
                            <Grid.Column width={2}>{phone}</Grid.Column>
                            <Grid.Column width={5}>{vaccinationCenter}</Grid.Column>
                            <Grid.Column width={2}>{date}</Grid.Column>
                        </Grid.Row>
                    )
                })
            }
        </Grid>
    )
}

export default AllUsers;