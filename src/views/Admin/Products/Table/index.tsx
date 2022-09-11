import * as React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Product } from '../../../types'

interface IAdminProductsTable {
  productsGetMany(): Promise<{ data: Product[] }>
}

const { useEffect, useState } = React

const AdminProductsTable = ({ productsGetMany }: IAdminProductsTable) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productsGetMany().then(({ data }) => setProducts(data))
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Sku</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.amount}</TableCell>
              <TableCell>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminProductsTable
