import * as React from 'react'
import { Box, Container, CssBaseline, Drawer } from '@mui/material'
import AdminSideBar from './AdminSideBar.tsx'
import NavBar from './NavBar.tsx'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const drawerWidth = 240
const navBarHeight = 70 // replace with the actual height of your NavBar

const AdminDashboard = () => {
  const [open, setOpen] = React.useState(true)

  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Drawer
            variant="persistent"
            open={open}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                marginTop: `${navBarHeight}px`, // add marginTop
              },
            }}
          >
            <AdminSideBar />
          </Drawer>
          {/* {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )} */}
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
          >
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default observer(AdminDashboard)
