import React from 'react'
import './App.css'
import Amplify from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState<any>()
  const [user, setUser] = React.useState<any>()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default AuthStateApp
