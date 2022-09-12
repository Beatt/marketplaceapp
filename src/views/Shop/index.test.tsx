import * as React from 'react'
import { waitFor, render, fireEvent, screen, act } from '@testing-library/react'
import Shop from './index'
import * as api from '../../api/products'

describe('Shop', function () {
  let props: any
  let createWrapper: any

  beforeEach(() => {
    props = {}

    // @ts-ignore
    jest.spyOn(api, 'productsGetMany').mockResolvedValue({
      data: [],
    })

    createWrapper = async () => {
      let wrapper
      await waitFor(() => {
        wrapper = render(<Shop />)
      })

      return wrapper
    }
  })

  it('list products by filters', async () => {
    await createWrapper()

    fireEvent.change(screen.getByTestId('search').querySelector('input')!, { target: { value: 'Producto A' } })

    await act(() => {
      fireEvent.click(screen.getByText('Aplicar filtros'))
    })

    expect(api.productsGetMany).toHaveBeenLastCalledWith({
      search: 'Producto A',
      range: [0, 10000],
    })
  })
})
