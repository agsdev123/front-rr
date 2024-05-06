
import { useAuthenticationLogin } from './hooks/authentication.login.hook'
import { useAuthenticationRegister } from './hooks/authentication.register.hook'

import { useAuthenticationToken } from './hooks/authentication.token.hook'

export namespace AuthenticationHook {
  export const useLogin = useAuthenticationLogin
  export const useRegister = useAuthenticationRegister
  export const useToken = useAuthenticationToken
}
