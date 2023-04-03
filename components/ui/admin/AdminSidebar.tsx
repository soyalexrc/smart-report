import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Collapse,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import {styled} from '@mui/material/styles';
import {UIContext} from "../../../context/ui";
import {AuthContext} from "../../../context/auth";
import {ADMIN_MENU_ITEMS} from '../../../utils/mock-data'
import {useRouter} from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';

const DrawerHeader = styled('div')(({theme}: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function AdminSidebar() {
  const router = useRouter()
  const {adminMenuOpen, closeAdminMenu, adminPanelOpen, setAdminPanelName} = React.useContext(UIContext)
  const {currentUser, logout} = React.useContext(AuthContext)
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  return (
    <Drawer
      variant={largeScreen ? 'persistent' : 'temporary'}
      anchor='left'
      open={adminMenuOpen}
      onClose={closeAdminMenu}
      sx={{
        width: 300,
        flexShrink: 0,
        position: 'relative',
        '& .MuiDrawer-paper': {
          backgroundColor: 'secondary.main',
          width: 301,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '1.5rem 2rem'}}>
        <Box
          mr={2}
          src='/icons/logo.png'
          component='img'
          width={90}
          height={90}
          sx={{borderRadius: 100}}
        />

      </DrawerHeader>
      {
        ADMIN_MENU_ITEMS.filter(x => x.roles?.includes(currentUser?.type)).map((route) => {
          if (!route.children) {
            return (
              <Box
                onClick={() => router.push(route.path!)}
                key={route.id}
                sx={{
                  cursor: 'pointer',
                  minHeight: 48,
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'initial',
                  backgroundColor: router.pathname === route.path ? 'rgba(255,255,255, 0.1)' : 'transparent',
                  "&:hover": {
                    backgroundColor: 'rgba(255,255,255, 0.1)',
                  },
                  px: 2.5,
                  py: 1.3
                }}
              >
                <Box
                  sx={{
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {route.icon}
                </Box>
                <Typography> {route.title}</Typography>
              </Box>
            )
          } else {
            return (
              <>
                <Box
                  onClick={() => setAdminPanelName(route.value)}
                  key={route.id}
                  sx={{
                    cursor: 'pointer',
                    minHeight: 48,
                    display: 'flex',
                    color: 'white',
                    justifyContent: 'space-between',
                    backgroundColor: adminPanelOpen === route.value ? 'rgba(255,255,255, 0.1)' : 'transparent',
                    "&:hover": {
                      backgroundColor: 'rgba(255,255,255, 0.1)',
                    },
                    px: 2.5,
                    py: 1.3
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {route.icon}
                    <Typography sx={{ml: 3}}> {route.title}</Typography>
                  </Box>
                  {adminPanelOpen === route.value ? <ExpandLess/> : <ExpandMore/>}
                </Box>
                <Collapse in={adminPanelOpen === route.value} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      route.children.map(child => (
                        <ListItemButton
                          key={child.id}
                          sx={{
                            pl: 4,
                            backgroundColor: router.pathname.includes(child.path!) ? 'rgba(255,255,255, 0.1)' : 'transparent',
                            "&:hover": {
                              backgroundColor: 'rgba(255,255,255, 0.1)',
                            },
                            py: 1.3
                          }}
                          onClick={() => router.push(child.path)}
                        >
                          <ListItemIcon>
                            <CircleIcon sx={{color: '#fff', fontSize: '10px'}}/>
                          </ListItemIcon>
                          <ListItemText sx={{color: '#fff'}} primary={child.title}/>
                        </ListItemButton>
                      ))
                    }
                  </List>
                </Collapse>
              </>
            )
          }
        })
      }


      <Divider/>

      <Box
        onClick={logout}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          bottom: 10,
          width: '100%',
          minHeight: 48,
          display: 'flex',
          color: 'white',
          justifyContent: 'initial',
          backgroundColor: 'transparent',
          "&:hover": {
            backgroundColor: 'rgba(255,255,255, 0.1)',
          },
          px: 2.5,
          py: 1.3
        }}>
        <Box
          sx={{
            mr: 3,
            justifyContent: 'center'
          }}
        >
          <LogoutIcon/>
        </Box>
        <Typography> Cerrar sesion</Typography>
      </Box>
    </Drawer>
  )
}
