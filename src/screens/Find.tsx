import { useState } from 'react'
import { api } from '../services/api'

import { Heading, useToast, VStack } from 'native-base'
import { Base, Button, Header, Input } from '../components/@index'
import { useNavigation } from '@react-navigation/native'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const toast = useToast()
  const { navigate } = useNavigation()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigate('pools')
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (error.response?.data.message === 'Pool not found') {
        return toast.show({
          title: 'Bolao não encontrado',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (error.response?.data.message === 'You already joined this pool.') {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      toast.show({
        title: 'Não foi possível econtrar o bolão!',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <Base>
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="lg"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão atráves de {'\n'} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </Base>
  )
}
