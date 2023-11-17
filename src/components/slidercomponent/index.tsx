import { Container, Grid } from '@mui/material'
import React from 'react'
import MainCard from './MainCard'


export default function index() {
  return (
    <div>
        <Container>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item sm={3} >
                    <MainCard/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}
