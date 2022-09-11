import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Grid } from '@mui/material'
import Home from '../views/Home'
import NavBar from './NavBar'
import AdminProducts from '../views/Admin/Products'
import AdminProductsCreate from '../views/Admin/Products/Create'
import Login from '../views/Admin/Login'

function App() {
  return (
    <Grid container>
      <Grid item sm={12}>
        <NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<AdminProductsCreate />} />
          </Routes>
        </NavBar>
      </Grid>
    </Grid>
  )
}

export default App
