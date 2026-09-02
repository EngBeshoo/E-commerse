export interface successLogin {
  message: string
  user: UserResponse
  token: string
}

export interface errorLogin {
  statusMsg: string
  message: string
}


export interface UserResponse {
  name: string
  email: string
  role: string
}
