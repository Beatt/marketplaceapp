import axios from 'axios'
import { API_URL, HEADER_JSON } from './constans'

export const productsGetMany = (values: any = {}) => {
  const params = {
    ...values,
  }

  return axios.get(`${API_URL}/products`, { params })
}

export const productsCreate = (data: any) => axios.post(`${API_URL}/products`, JSON.stringify(data), HEADER_JSON)
