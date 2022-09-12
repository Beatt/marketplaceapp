import * as React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { usersAuth } from '../../../api/users'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Campo obligatorio'),
  password: yup.string().required('Campo obligatorio'),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'La contraseña no es la misma'),
})

const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // @ts-ignore
  const { authService } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await usersAuth(values)
        authService.authenticate(data)
        window.location.href = '/admin/products'
      } catch ({ response }) {
        // @ts-ignore
        enqueueSnackbar(response.data.errors.join(', '), {
          variant: 'error',
        })
      }
    },
  })

  return (
    <Box sx={style}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item sm={12} textAlign="center">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              ¡Iniciar sesión!
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
          <Grid item sm={12} mb={2}>
            <Button type="submit" variant="outlined" color="success" fullWidth>
              ¡Iniciar sesión!
            </Button>
          </Grid>
          <Grid item sm={12} textAlign="center">
            <Button type="button" variant="text" color="primary" fullWidth onClick={() => navigate('/')}>
              ¡Registrarse!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Login
