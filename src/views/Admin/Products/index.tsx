import * as React from 'react'
import { Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AdminProductsTable from './Table'
import { productsGetMany } from '../../../api/products'
import { AuthContext } from '../../../contexts/AuthContext'
import Home from '../../Home'

const { useContext } = React

const AdminProducts = () => {
  const navigate = useNavigate()
  // @ts-ignore
  const { authService } = useContext(AuthContext)

  return (
    <Grid container>
      {authService.isAuthenticate() ? (
        <>
          <Grid item sm={12} textAlign="right" mb={2}>
            <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/admin/products/new')}>
              Crear nuevo producto
            </Button>
          </Grid>
          <Grid item sm={12}>
            <AdminProductsTable {...{ productsGetMany }} />
          </Grid>
        </>
      ) : (
        <Home />
      )}
    </Grid>
  )
}

export default AdminProducts
