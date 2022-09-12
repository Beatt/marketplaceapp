import * as React from 'react'
import { userAuthService as authService } from '../services'
const { createContext } = React
const AuthContext = createContext({})

const AuthContextProvider = ({ children }: any) => {
  return <AuthContext.Provider value={{ authService }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
