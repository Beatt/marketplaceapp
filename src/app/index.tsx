import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Grid } from '@mui/material'
import Home from '../views/Home'
import Products from '../views/Admin/Products'
import NavBar from './NavBar'

function App() {
  return (
    <Grid container>
      <Grid item sm={12}>
        <NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/products" element={<Products />} />
          </Routes>
        </NavBar>
      </Grid>
    </Grid>
  )
}

export default App
