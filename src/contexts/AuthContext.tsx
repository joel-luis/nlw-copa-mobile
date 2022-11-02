import { createContext, ReactNode, useContext } from 'react'

interface UserProps {
  name: string
  avatarUrl: string
}

interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn() {
    console.log('Vamos logar')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Joel Luis',
          avatarUrl: 'https://www.github.com/joel-luis.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
