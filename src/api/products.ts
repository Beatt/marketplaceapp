import axios from 'axios'
import { API_URL, HEADER_JSON } from './constans'

export const productsGetMany = () => axios.get(`${API_URL}/products`)
export const productsCreate = (data: any) => axios.post(`${API_URL}/products`, JSON.stringify(data), HEADER_JSON)
