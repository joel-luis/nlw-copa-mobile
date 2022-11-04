import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'
import { useAuth } from '../contexts/AuthContext'
import { Base } from '../components/Base'

export function Routes() {
  const { user } = useAuth()
  return (
    <Base>
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Base>
  )
}
