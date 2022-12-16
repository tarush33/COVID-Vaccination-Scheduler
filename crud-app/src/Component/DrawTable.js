import 'semantic-ui-css/semantic.min.css'
import { Grid, Input,Button } from 'semantic-ui-react'
import axios from 'axios';
import { useState, useEffect } from 'react'

const DrawTable=(props)=>{
  const { slots }=props
  return(
    <Grid celled padded >
      <Grid.Row color='teal' textAlign='center'>
        <Grid.Column width={4}>Center Name</Grid.Column>
        <Grid.Column>Vaccine Capacity</Grid.Column>
        <Grid.Column>Dose 1 Left</Grid.Column>
        <Grid.Column>Dose 2 Left</Grid.Column>
        <Grid.Column>Minimum Age Limit</Grid.Column>
        <Grid.Column>Opening Time</Grid.Column>
        <Grid.Column>Fees</Grid.Column>
        <Grid.Column width={6}>Slot Address</Grid.Column>
      </Grid.Row>
      {
        slots.map((slot)=>{
          return(
            <Grid.Row>
              <Grid.Column width={4}>{slot.name}</Grid.Column>
              <Grid.Column>{slot.available_capacity}</Grid.Column>
              <Grid.Column>{slot.available_capacity_dose1}</Grid.Column>
              <Grid.Column>{slot.available_capacity_dose2}</Grid.Column>
              <Grid.Column>{slot.min_age_limit}</Grid.Column>
              <Grid.Column>{slot.from}</Grid.Column>
              <Grid.Column>{slot.fee}</Grid.Column>
              <Grid.Column width={6}>{slot.address}</Grid.Column>
            </Grid.Row>
          )
        })
      }
    </Grid>
  )

}

export default DrawTable