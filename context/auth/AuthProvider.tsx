import React from 'react';
import {AuthContext, authReducer} from "./";
import {User} from '../../interfaces';
import Cookie from 'js-cookie'
import {useRouter} from 'next/router';
import {useSnackbar} from "notistack";

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User ;
  loading: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  currentUser: {
    password: '',
    username: '',
    type: ''
  },
  loading: false
}

export const AuthProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar()

  const [state, dispatch] = React.useReducer(authReducer, AUTH_INITIAL_STATE)

  const login = async (loginData: {username: string, password: string}) => {
    try {
      dispatch({type: 'Auth - Loading State', payload: true})
      dispatch({type: 'Auth - Login', payload: {...loginData, type: 'User'}})
      localStorage.setItem('sr-user', JSON.stringify({...loginData, type: 'User'}))
      localStorage.setItem('sr-token', JSON.stringify({...loginData, type: 'User'}))
      Cookie.set('isAuthenticated', 'true')
      await router.push('/')
      await enqueueSnackbar(`Bienvenido/a ${loginData.username}`, {variant: 'success'})

    } catch (e) {
      console.log(e)
      enqueueSnackbar('Ocurrio un error inesperado...', {variant: 'error'})
    } finally {
      dispatch({type: 'Auth - Loading State', payload: false})
    }
  }

  const logout = async () => {
    dispatch({type: 'Auth - Logout'})
    await router.push('/login')
    localStorage.removeItem('sr-user')
    localStorage.removeItem('sr-token')
    Cookie.remove('isAuthenticated')
  }



  const providerValue = React.useMemo(() => ({
    ...state,
    login,
    logout
  }), [state])

  React.useEffect(() => {
    dispatch({type: 'Auth - Set User', payload: JSON.parse(localStorage.getItem('sr-user') ?? '{}')})
  }, [])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
