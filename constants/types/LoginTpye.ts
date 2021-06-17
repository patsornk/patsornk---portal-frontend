export interface UserFormData {
  username: string
  password: string
  grant_type?: string
  client_id?: string
}

export interface ErrorUserFormData {
  username: string
  password: string
}

export interface ResetPasswordFormData {
  newPassword: string
  confirmPassword: string
}

export interface ErrorResetPasswordFormData {
  newPassword: string
  confirmPassword: string
}
