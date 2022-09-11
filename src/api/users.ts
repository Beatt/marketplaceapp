import axios from 'axios'
import { API_URL, HEADER_JSON } from './constans'

export const usersCreate = (data: any) => axios.post(`${API_URL}/users`, JSON.stringify(data), HEADER_JSON)
