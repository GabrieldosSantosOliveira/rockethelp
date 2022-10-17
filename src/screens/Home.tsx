import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center
} from 'native-base';
import {
  SignOut,
  ChatTeardropText
} from 'phosphor-react-native';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';
import { dateFormat } from '../utils/firestoreDateFormat';
const Home = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<
    'open' | 'closed'
  >('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const navigation = useNavigation();

  const handleNewOrder = () => {
    navigation.navigate('new');
  };
  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId });
  };
  const handleLogout = () => {
    auth()
      .signOut()
      .catch(() => {
        Alert.alert('Sair', 'Não foi possível sair');
      });
  };
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const {
            patrimony,
            description,
            status,
            created_at
          } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          };
        });
        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);
  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        alignItems="center"
        justifyContent="space-between"
        bg="gray.600"
        px={6}
        py={5}
        pt={12}
      >
        <Logo />
        <IconButton
          icon={
            <SignOut size={26} color={colors.gray[300]} />
          }
          onPress={handleLogout}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={8}
          w="full"
          mb={4}
        >
          <Heading color="gray.100">Meus Chamados</Heading>
          <Text color="gray.200">{orders.length ?? 0}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            title="em andamento"
            type="closed"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Order
                data={item}
                onPress={() => handleOpenDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText
                  color={colors.gray[300]}
                  size={40}
                />
                <Text
                  color="gray.300"
                  fontSize="xl"
                  mt={6}
                  textAlign="center"
                >
                  Você ainda não possui solicitações{' '}
                  {statusSelected === 'open'
                    ? 'em andamento'
                    : 'finalizadas'}
                  .
                </Text>
              </Center>
            )}
          />
        )}
        <Button
          title="Nova Solicitação"
          onPress={handleNewOrder}
        />
      </VStack>
    </VStack>
  );
};
export { Home };
