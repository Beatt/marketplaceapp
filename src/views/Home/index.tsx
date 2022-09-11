import * as React from 'react'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import SignIn from '../Admin/SignIn'
import { usersCreate } from '../../api/users'
import { useNavigate } from 'react-router-dom'

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

const Home = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  async function handleSubmit(values: {}): Promise<void> {
    try {
      await usersCreate(values)
      handleClose()
      return Promise.resolve()
    } catch ({ response }) {
      // @ts-ignore
      return Promise.reject(response?.data)
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" minHeight="80vh">
      <Grid item sm={12}>
        <Typography variant="h1">Marketplace</Typography>
        <Typography variant="subtitle1" marginBottom={5}>
          ¡El marketplace más grande! Nunca fue tan fácil vender tus productos.
        </Typography>
        <Button type="button" variant="outlined" color="primary" size="large" onClick={handleOpen}>
          ¡Crear cuenta!
        </Button>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignIn onSubmit={handleSubmit} />
        </Box>
      </Modal>
    </Grid>
  )
}

export default Home
