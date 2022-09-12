import * as React from 'react'
import { Box, Button, Grid, ImageList, ImageListItem, Modal, Typography } from '@mui/material'
import SignIn from '../Admin/SignIn'
import { usersCreate } from '../../api/users'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Login } from '@mui/icons-material'

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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
]

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  }
}

const Home = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // @ts-ignore
  const { authService } = useContext(AuthContext)

  async function handleSubmit(values: {}): Promise<void> {
    try {
      const { data } = await usersCreate(values)
      handleClose()
      authService.authenticate(data)
      return Promise.resolve()
    } catch ({ response }) {
      // @ts-ignore
      return Promise.reject(response?.data)
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" minHeight="80vh">
      <Grid item sm={7}>
        <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={4} rowHeight={121}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item sm={5}>
        <Typography variant="h2">Crea tu producto</Typography>
        <Typography variant="h4" marginBottom={5}>
          Organiza de manera profesional tu inventario
        </Typography>
        <Button type="button" variant="text" color="primary" size="large" onClick={handleOpen}>
          Conocer más
        </Button>
        <Button type="button" variant="outlined" color="secondary" size="large" onClick={handleOpen}>
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
