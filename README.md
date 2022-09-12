# Descripción

Prueba técnica YAYDOO FULLSTACK. Elaborar un Marketplace

## Requerimientos

- node v14.20.0
- npm v6.13.4

## Tecnologías

- React
- React Router
- Jest
- Formik
- Yup
- MaterialUI
- Prettier js
- Axios

## Instalación

- `git clone git@github.com:Beatt/marketplaceapp.git`
- `npm install`
- Copiar **.env.development** y renombrar a **.env.development.local**
- Modificar envs de **.env.development.local**
    - **REACT_APP_API_URL**. Dirección del api [marketplaceapi](https://github.com/Beatt/marketplaceapi) 
- `npm start`

## Tests

Casos de uso
- Producto
  - create product 
  - show message error when create product fail
- Cuenta
  - create account
  - show error message when email exist
  - show error message when password won't be the same
- Comprador
  - list products by filters

`npm test`

## Formatting code

`npm run format`
