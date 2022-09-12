import UserAuthService from './UserAuthService'

import axios from 'axios'

export const userAuthService = new UserAuthService(axios.get, localStorage)
