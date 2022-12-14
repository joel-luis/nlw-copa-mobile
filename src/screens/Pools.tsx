import { useState, useCallback } from 'react'
import { api } from '../services/api'

import { VStack, Icon, useToast, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { PoolPros } from '../components/PoolCard'
import {
  Base,
  Button,
  Header,
  PoolCard,
  Loading,
  EmptyPoolList,
} from '../components/@index'

export function Pools() {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolPros[]>([])

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPools() {
    try {
      const response = await api.get('/pools')
      setPools(response.data.pools)
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'Não foi possivel carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools()
    }, []),
  )

  return (
    <Base>
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate('find')}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyPoolList />}
          _contentContainerStyle={{ pb: 90 }}
          px={5}
        />
      )}
    </Base>
  )
}
