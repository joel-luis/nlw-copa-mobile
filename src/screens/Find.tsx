import { Heading, VStack } from 'native-base'

import { Base, Button, Header, Input } from '../components/@index'

export function Find() {
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
        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </Base>
  )
}
