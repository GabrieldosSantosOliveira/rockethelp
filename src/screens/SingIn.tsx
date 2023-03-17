import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { VStack, Heading, Icon, useTheme, HStack } from 'native-base';
import { Text } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, TouchableOpacity } from 'react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
type IForm = {
  email: string;
  password: string;
};
export const SingIn = () => {
  const { control, handleSubmit } = useForm<IForm>();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const handleSingIn = ({ email, password }: IForm) => {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha');
    }
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'Email ou senha inválido');
        }
        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'Email ou senha inválido');
        }
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Email ou senha inválido');
        }
        return Alert.alert('Entrar', 'Não foi possível entrar');
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua Conta
      </Heading>
      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Email"
            marginBottom={4}
            InputLeftElement={
              <Icon
                ml={3}
                as={
                  <SimpleLineIcons name="envelope" color={colors.gray[300]} />
                }
              />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mb={8}
            placeholder="Senha"
            InputLeftElement={
              <Icon
                ml={3}
                as={<Octicons name="key" color={colors.gray[300]} />}
              />
            }
            secureTextEntry
          />
        )}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSubmit(handleSingIn)}
        isLoading={isLoading}
      />
      <HStack justifyContent="center" alignItems="center" paddingTop={12}>
        <Text color="blueGray.300">Não possui cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text color="green.400">Cadastre-se agora</Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};
