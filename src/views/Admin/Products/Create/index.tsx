import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import AdminProductsForm from '../Form'
import { productsCreate } from '../../../../api/products'

const AdminProductsCreate = () => {
  async function handleSubmit(values: {}) {
    await productsCreate(values)
  }

  return (
    <Grid container>
      <Grid item sm={2} />
      <Grid item sm={8}>
        <Typography variant="h4" component="h2" textAlign="center">
          ¡Crear producto!
        </Typography>
        <AdminProductsForm onSubmit={handleSubmit} getUserAuth={() => ({ id: 1 })} />
      </Grid>
    </Grid>
  )
}

export default AdminProductsCreate
