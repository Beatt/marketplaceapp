import * as React from 'react'
import { Button, Grid, Paper, Slider, TextField, Typography } from '@mui/material'
import { Product } from '../types'
import { productsGetMany } from '../../api/products'

const { useState, useEffect } = React

const PRICE_LOWER = 0
const PRICE_MAX = 10000

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [values, setValues] = useState({
    range: [PRICE_LOWER, PRICE_MAX],
    search: '',
  })

  useEffect(() => {
    getProducts()
  }, [])

  const handleChange = (name: string, value: any) => {
    setValues({
      ...values,
      [name]: value,
    })
  }

  function getProducts() {
    productsGetMany(values).then(({ data }) => {
      setProducts(data)
    })
  }

  function handleFilters() {
    getProducts()
  }

  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h2" component="h2" gutterBottom>
          ¡Comprador!
        </Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography gutterBottom>Precios</Typography>
        <Slider
          valueLabelDisplay="auto"
          value={values.range}
          onChange={({ target }: any) => handleChange('range', target.value)}
          max={PRICE_MAX}
        />
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom>{PRICE_LOWER}</Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom>{PRICE_MAX}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} />
      <Grid item sm={9}>
        <Grid container>
          <Grid item sm={6}>
            <TextField
              id="search"
              label="Buscar por nombre y/o sku"
              data-testid="search"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              fullWidth
              value={values.search}
              onChange={({ target }: any) => handleChange('search', target.value)}
            />
          </Grid>
          <Grid item sm={6} pt={3} pl={3}>
            <Button type="button" variant="outlined" color="secondary" size="large" onClick={handleFilters}>
              Aplicar filtros
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          {products.map((product) => (
            <Grid item sm={3} key={product.id}>
              <Grid direction="column" justifyContent="center" alignContent="center" textAlign="center">
                <Paper variant="outlined" style={{ padding: 10 }}>
                  <img src="https://via.placeholder.com/60" alt="" />
                  <Typography variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="caption" component="h2">
                    {product.sku}
                  </Typography>
                  <Typography variant="subtitle2" component="h2">
                    {product.price}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Shop
