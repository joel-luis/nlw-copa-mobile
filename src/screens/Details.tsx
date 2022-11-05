import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { HStack, useToast, VStack } from 'native-base'
import { Share } from 'react-native'

import { api } from '../services/api'

import {
  Base,
  EmptyMyPoolList,
  Header,
  Loading,
  Option,
  PoolHeader,
} from '../components/@index'
import { PoolPros } from '../components/PoolCard'

interface RouteParams {
  id: string
}

export function Details() {
  const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros)
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses',
  )

  const route = useRoute()
  const toast = useToast()
  const { id } = route.params as RouteParams

  async function fetchPoolDetails() {
    try {
      const response = await api.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão!',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    })
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Base>
      <Header
        title={poolDetails.title.toUpperCase()}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </Base>
  )
}
