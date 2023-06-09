import React from 'react';
import {Box, useMediaQuery} from "@mui/material";
import Head from "next/head";
import {AdminSidebar, AdminNavbar} from "../ui/admin";
import {UIContext} from "../../context/ui";
import {AuthContext} from "../../context/auth";
import {useRouter} from "next/router";

interface AdminLayoutProps {
  title?: string;
  children: JSX.Element
}
export  function AdminLayout({title = 'Admin - Vision Inmobiliaria', children}: AdminLayoutProps) {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const {currentUser} = React.useContext(AuthContext)
  const {adminMenuOpen} = React.useContext(UIContext)

  const router = useRouter()

  React.useEffect(() => {
    if (!currentUser) router.replace('/autenticacion/login')
  }, [])

  return (
    <Box sx={{ flexFlow: 1, marginTop: 10 }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminNavbar />
      <AdminSidebar />
      {/*Attributes Update / Create */}
      <Box sx={{ marginLeft: (largeScreen && adminMenuOpen) ? '300px' : '0px', p: 2 }}>
        {children}
      </Box>
      {/*<Footer />*/}
    </Box>
  )
}
