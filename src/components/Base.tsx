import { ReactNode } from 'react'
import { ImageBackground } from 'react-native'
import { VStack } from 'native-base'

import bg from '../assets/bg-screen.png'

interface BaseProps {
  children: ReactNode
}

export function Base({ children }: BaseProps) {
  return (
    <VStack flex={1} bgColor="gray.900">
      <ImageBackground source={bg} resizeMode="cover" style={{ flex: 1 }}>
        {children}
      </ImageBackground>
    </VStack>
  )
}
