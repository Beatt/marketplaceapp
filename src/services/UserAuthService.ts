import { User } from '../views/types'

class UserAuthService {
  constructor(private readonly makeRequestGet: any, private readonly localStore: any) {}

  authenticate(user: User) {
    this.localStore.setItem('user', JSON.stringify(user))
  }

  isAuthenticate(): boolean {
    const user = this.localStore.getItem('user')
    return user !== null
  }

  getUser() {}

  logout() {
    this.localStore.removeItem('user')
  }
}

export default UserAuthService
