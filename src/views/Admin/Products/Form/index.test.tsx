import * as React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AdminProductsForm from './index'
import { SnackbarProvider } from 'notistack'

describe('AdminProductsForm', function () {
  let props: any
  let createWrapper: any

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      getUserAuth: jest.fn(),
    }

    jest.spyOn(props, 'getUserAuth').mockReturnValue({ id: 1 })

    createWrapper = () =>
      render(
        <SnackbarProvider>
          <AdminProductsForm {...props} />
        </SnackbarProvider>,
      )
  })

  it('create product', async () => {
    createWrapper()

    fireEvent.change(screen.getByTestId('name').querySelector('input')!, { target: { value: 'Product A' } })
    fireEvent.change(screen.getByTestId('sku').querySelector('input')!, { target: { value: '0001' } })
    fireEvent.change(screen.getByTestId('amount').querySelector('input')!, { target: { value: 1 } })
    fireEvent.change(screen.getByTestId('price').querySelector('input')!, { target: { value: 100 } })

    await act(() => {
      fireEvent.submit(screen.getByText('¡Guardar!'))
    })

    expect(props.onSubmit).toHaveBeenCalledWith({
      name: 'Product A',
      sku: '0001',
      amount: 1,
      price: 100,
      user_id: 1,
    })
    expect(document.body.textContent).toEqual(expect.stringMatching('¡Se ha guardado correctamente el producto!'))
  })

  it('show message error when create product fail', async () => {
    jest.spyOn(props, 'onSubmit').mockRejectedValue({ errors: ['Ha ocurrido un error'] })

    createWrapper()

    fireEvent.change(screen.getByTestId('name').querySelector('input')!, { target: { value: 'Product A' } })
    fireEvent.change(screen.getByTestId('sku').querySelector('input')!, { target: { value: '0001' } })
    fireEvent.change(screen.getByTestId('amount').querySelector('input')!, { target: { value: 1 } })
    fireEvent.change(screen.getByTestId('price').querySelector('input')!, { target: { value: 100 } })

    await act(() => {
      fireEvent.submit(screen.getByText('¡Guardar!'))
    })

    expect(document.body.textContent).toEqual(expect.stringMatching('Ha ocurrido un error'))
  })
})
