import { useCoreStore } from '@web/core/store'
import { MrbSplashScreen } from '@web/designSystem'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { RouterObject } from '../../core/router'
import { useAuthentication } from './authentication.context'
import { AuthenticationHook } from '@web/domain/authentication'

type Props = {
  children: ReactNode
  isPublic?: boolean
}

function AuthenticationGuard({ children, isPublic }: Props) {
  const authentication = useAuthentication()
  const store = useCoreStore()
  const pathname = usePathname()
  const router = useRouter()
  const authenticationToken = AuthenticationHook.useToken()
  const [isLoading, setLoading] = useState(true)
  const [isRedirected, setRedirected] = useState(false)
  const [pathRedirected, setPathRedirected] = useState<string>()

  const handlePublic = async () => {
    if (!authentication.user?._id) {
      setLoading(false)

      setRedirected(true)

      return
    }
    if (authentication.user?._id) {
      navigateAndSetLoading(RouterObject.route.HOME)
    }else{
      navigateAndSetLoading(RouterObject.route.LOGIN)
    }
  }

  const handleProtected = async () => {
    if (authentication.user?._id) {
      setLoading(false)

      setRedirected(true)

      return
    }
    if (!authentication.user?._id) {
      navigateAndSetLoading(RouterObject.route.LOGIN)
    }else{
      navigateAndSetLoading(RouterObject.route.HOME)
    }
  }

  const navigateAndSetLoading = (path: string) => {
    router.replace(path)
    setPathRedirected(path)
    setLoading(false)
  }

  useEffect(() => {
    isPublic ? handlePublic() : handleProtected()
  }, [isPublic, authentication.isLoggedIn])

  useEffect(() => {
    if (!isLoading && pathname === pathRedirected) {
      setRedirected(true)
    }
  }, [isLoading, pathRedirected])
console.log(isRedirected,isLoading)
  if (isLoading|| !isRedirected) {
    return <MrbSplashScreen name="ayuscare" />
  }

  return <>{children}</>
}

export { AuthenticationGuard }
