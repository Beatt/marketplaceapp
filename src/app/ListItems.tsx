import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { useNavigate } from 'react-router-dom'
import { ListItemText } from '@mui/material'

const MainListItems = () => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/admin/products')}>
        <ListItemIcon>
          <Inventory2OutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/shop')}>
        <ListItemIcon>
          <AddShoppingCartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Comprador" />
      </ListItemButton>
    </React.Fragment>
  )
}

export default MainListItems
