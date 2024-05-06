import axiosInstance from '../../../libraries/axios/axios'

export const login = async values => {
  const { data } = await axiosInstance.post('/v1/auth/login', values)
  const { token } = data

  if (token) {
    localStorage.setItem('APP_ACCESS_TOKEN', token)
  }

  return data
}

export const register = async values => {
  const {data} = await axiosInstance.post('/v1/auth/register', values)
  const { token } = data
  console.log('token', data, token)
  if (token) {
    localStorage.setItem('APP_ACCESS_TOKEN', token)
  }

  return data
}

export const logout = async () => {
  try {
    await axiosInstance.post('/v1/authentication/logout')
  } catch (error) {
    // Handle error if needed
  }

  localStorage.removeItem('APP_ACCESS_TOKEN')
}
