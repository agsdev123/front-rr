'use client'

import { RouterObject } from '@web/core/router'
import { useCoreStore } from '@web/core/store'
import { AuthenticationHook } from '@web/domain/authentication'
import { useAuthentication } from '@web/modules/authentication'
import { GoogleOauth } from '@web/modules/googleOauth'
import { GoogleButton } from '@web/modules/googleOauth/components/googleButton'
import { Button, Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { ErrorAlert } from './components/ErrorAlert'
import { LoginForm } from './components/LoginForm'
import { Api } from '@web/domain'
import {setItem} from '@web/libraries/localStorage'
const { Text } = Typography

export default function LoginPage() {
  const router = useRouter()
  const store = useCoreStore()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()

  const {
    login,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
    errors: errorsLogin,
  } = AuthenticationHook.useLogin()



  const isSuccess = isSuccessLogin 
  const isLoading = isLoadingLogin  || isSuccess
  const errors = [...errorsLogin, ]

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  const onError = () => {
    enqueueSnackbar('Could not login with Google', { variant: 'error' })
  }

  const onSuccess = async () => {
    try {
      const {user} = await Api.User.findMe()
      setItem('user', JSON.stringify(user));
      authentication.login(user)
      router.push(RouterObject.route.HOME)
    } catch (error) {
      enqueueSnackbar('Something went wrong during the initialization', {
        variant: 'error',
      })
    }
  }

  /* -------------------------------- HANDLERS -------------------------------- */

  const handleSubmit = (values: any) => {
    login(values)
  }

 
  return (
    <>
      <Flex align="center" justify="center" vertical flex={1}>
        <Flex
          vertical
          style={{
            width: '340px',
            paddingBottom: '100px',
            paddingTop: '100px',
          }}
          gap="middle"
        >
          <Header description="Welcome back!" />
          <ErrorAlert errors={errors} />

          <LoginForm
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />


          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => router.push(RouterObject.route.REGISTER)}
          >
            <Flex gap={'small'} justify="center">
              <Text type="secondary">No account?</Text> <Text>Sign up</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
