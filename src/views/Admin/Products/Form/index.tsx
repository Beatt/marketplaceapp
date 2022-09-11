import * as React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Grid, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
  name: yup.string().required('Campo obligatorio'),
  sku: yup.string().required('Campo obligatorio'),
  amount: yup.number().required('Campo obligatorio'),
  price: yup.number().required('Campo obligatorio'),
})

interface IAdminProductsForm {
  onSubmit(values: {}): Promise<void | string>
  getUserAuth(): { id: number }
}

const AdminProductsForm = ({ onSubmit, getUserAuth }: IAdminProductsForm) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      name: '',
      sku: '',
      amount: '',
      price: '',
      user_id: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit({ ...values, user_id: getUserAuth().id })
        enqueueSnackbar('¡Se ha guardado correctamente el producto!', {
          variant: 'success',
        })
        navigate('/admin/products')
      } catch ({ errors }) {
        // @ts-ignore
        enqueueSnackbar(errors.join(', '), {
          variant: 'error',
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item sm={12}>
          <TextField
            id="name"
            label="Nombre"
            data-testid="name"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="sku"
            label="Sku"
            data-testid="sku"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.touched.sku && Boolean(formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="amount"
            label="Cantidad"
            data-testid="amount"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            type="number"
            margin="normal"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="price"
            label="Precio"
            data-testid="price"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            type="number"
            margin="normal"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Grid>
        <Grid item sm={12} mb={2} textAlign="right">
          <Button type="button" variant="text" color="primary" onClick={() => navigate('/admin/products')}>
            Cancelar
          </Button>
          <Button type="submit" variant="outlined" color="success">
            ¡Guardar!
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AdminProductsForm
