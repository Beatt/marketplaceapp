import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AuthContextProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
