import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useNavigate } from 'react-router-dom'

const MainListItems = () => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/admin/products')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
      </ListItemButton>
    </React.Fragment>
  )
}

export default MainListItems
