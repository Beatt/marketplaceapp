import * as React from 'react'
import * as yup from 'yup'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Campo obligatorio'),
  password: yup
    .string()
    .min(5, 'La contraseña debería de tener por lo menos 5 carácteres')
    .required('Campo obligatorio'),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'La contraseña no es la misma'),
})

interface ISignIn {
  onSubmit(values: {}): Promise<void | string>
}

const SignIn = ({ onSubmit }: ISignIn) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values)
        window.location.href = '/admin/products'
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
        <Grid item sm={12} textAlign="center">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            ¡Crear cuenta!
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="email"
            name="email"
            label="Correo electrónico"
            data-testid="email"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            data-testid="password"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="confirm"
            name="confirm"
            label="Confirmar contraseña"
            data-testid="confirm"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            helperText={formik.touched.confirm && formik.errors.confirm}
          />
        </Grid>
        <Grid item sm={12} mb={2}>
          <Button type="submit" variant="outlined" color="success" fullWidth>
            ¡Registrarse!
          </Button>
        </Grid>
        <Grid item sm={12} textAlign="center">
          <Button type="button" variant="text" color="primary" fullWidth onClick={() => navigate('/login')}>
            ¡Iniciar sesión!
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignIn
