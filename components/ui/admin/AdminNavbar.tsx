import React from 'react';
import {AppBar, Toolbar, IconButton, Box, useMediaQuery, Badge, Typography} from "@mui/material";
import { MenuChild, MenuElement} from "../../../utils/mock-data";
import {styled} from "@mui/material/styles";

import NotificationsIcon from "@mui/icons-material/Notifications";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import {useRouter} from "next/router";
import {UIContext} from "../../../context/ui";
import ChatIcon from '@mui/icons-material/Chat';
import {SearchInput} from "./";
import {AuthContext} from "../../../context/auth";


const DrawerHeader = styled('div')(({theme}: any) => ({
  display: 'flex',
  alignItems: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function AdminNavbar() {
  const router = useRouter()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const {toggleAdminMenu, adminMenuOpen} = React.useContext(UIContext)
  const {currentUser} = React.useContext(AuthContext)

  return (
    <AppBar position='fixed' sx={{backgroundColor: 'secondary.main',}}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Box display='flex' alignItems='center' sx={{paddingLeft: (largeScreen && adminMenuOpen) ? '300px' : '0px'}}>
          <IconButton onClick={toggleAdminMenu} size='large' edge='start'>
            <MenuOutlinedIcon sx={{color: '#fff'}}/>
          </IconButton>
          <DrawerHeader

            sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '1rem 0'}}>
            <Box
              mr={2}
              component='img'
              src={'/images/no-image.jpg'}
              width={40}
              height={40}
              sx={{borderRadius: 100}}
            />
            {
              largeScreen &&
              <Box>
                <Typography variant='h5' color='#fff'>{currentUser?.username} </Typography>
                <Typography color='#fff'>{currentUser?.type}</Typography>
              </Box>
            }
          </DrawerHeader>

        </Box>


        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <SearchInput/>

          <IconButton disabled size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="error">
              <ChatIcon sx={{color: '#fff'}}/>
            </Badge>
          </IconButton>
          <IconButton
            disabled
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{color: '#fff'}}/>
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
