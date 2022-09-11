import * as React from 'react'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import SignIn from './index'

describe('SignIn', function () {
  let props: any
  let createWrapper: any

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
    }
    createWrapper = () =>
      render(
        <SnackbarProvider>
          <SignIn {...props} />
        </SnackbarProvider>,
      )
  })

  it('create account', async () => {
    createWrapper()

    fireEvent.change(screen.getByTestId('email').querySelector('input')!, { target: { value: 'gabriel@gmail.com' } })
    fireEvent.change(screen.getByTestId('password').querySelector('input')!, { target: { value: '123456789' } })
    fireEvent.change(screen.getByTestId('confirm').querySelector('input')!, { target: { value: '123456789' } })

    await act(() => {
      fireEvent.submit(screen.getByText('¡Registrarse!'))
    })

    expect(props.onSubmit).toHaveBeenCalledWith({
      email: 'gabriel@gmail.com',
      password: '123456789',
      confirm: '123456789',
    })
  })

  it('show error message when email exist', async () => {
    jest.spyOn(props, 'onSubmit').mockRejectedValue({
      errors: ['El usuario ya existe'],
    })

    createWrapper()

    fireEvent.change(screen.getByTestId('email').querySelector('input')!, { target: { value: 'gabriel@gmail.com' } })
    fireEvent.change(screen.getByTestId('password').querySelector('input')!, { target: { value: '123456789' } })
    fireEvent.change(screen.getByTestId('confirm').querySelector('input')!, { target: { value: '123456789' } })

    await act(() => {
      fireEvent.submit(screen.getByText('¡Registrarse!'))
    })

    expect(document.body.textContent).toEqual(expect.stringMatching('El usuario ya existe'))
  })

  it('show error message when password wont be the same', async () => {
    createWrapper()

    fireEvent.change(screen.getByTestId('email').querySelector('input')!, { target: { value: 'gabriel@gmail.com' } })
    fireEvent.change(screen.getByTestId('password').querySelector('input')!, { target: { value: '123456789' } })
    fireEvent.change(screen.getByTestId('confirm').querySelector('input')!, { target: { value: 'otro password' } })

    await act(() => {
      fireEvent.submit(screen.getByText('¡Registrarse!'))
    })

    expect(document.body.textContent).toEqual(expect.stringMatching('La contraseña no es la misma'))
  })
})
