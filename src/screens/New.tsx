import { Heading, Text, VStack } from 'native-base'
import Logo from '../assets/logo.svg'

import { Base } from '../components/Base'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function New() {
  return (
    <Base>
      <Header title="Criar um novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="lg"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>
        <Input mb={2} placeholder="Qual nome do seu bolão?" />
        <Button title="CRIAR MEU BOLÃO" />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={5} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </Base>
  )
}
