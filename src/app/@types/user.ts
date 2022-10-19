export interface User {
  id: string
  name: string
  email: string
  token: string
  refreshToken: string
}

export interface CreateUserForm {
  name: string
  email: string
  password: string
}

export interface ReadUserForm {
  email: string
  password: string
}
