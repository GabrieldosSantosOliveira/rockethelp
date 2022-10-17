import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  Heading,
  Icon,
  useTheme
} from 'native-base';
import { Text } from 'native-base';
import { Key, Envelope } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const SingIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme();
  const handleSingIn = () => {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha');
    }
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)

      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert(
            'Entrar',
            'Email ou senha inválido'
          );
        }
        if (error.code === 'auth/wrong-password') {
          return Alert.alert(
            'Entrar',
            'Email ou senha inválido'
          );
        }
        if (error.code === 'auth/user-not-found') {
          return Alert.alert(
            'Entrar',
            'Email ou senha inválido'
          );
        }
        return Alert.alert(
          'Entrar',
          'Não foi possível entrar'
        );
      });
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <VStack
      flex={1}
      alignItems="center"
      bg="gray.600"
      px={8}
      pt={24}
    >
      <Logo />
      <Heading
        color="gray.100"
        fontSize="xl"
        mt={20}
        mb={6}
      >
        Acesse sua Conta
      </Heading>
      <Input
        placeholder="Email"
        marginBottom={4}
        InputLeftElement={
          <Icon
            as={<Envelope color={colors.gray[300]} />}
          />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={
          <Icon as={<Key color={colors.gray[300]} />} />
        }
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSingIn}
        isLoading={isLoading}
      />
      <Text
        alignSelf="flex-start"
        color="blueGray.300"
        mt={8}
      >
        Não possui cadastro?{' '}
        <Text color="green.400" onPress={handleSignUp}>
          Entre por aqui
        </Text>
      </Text>
    </VStack>
  );
};
export { SingIn };
