import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { VStack, Heading, Icon, useTheme, Text, HStack } from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, TouchableOpacity } from 'react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
type IForm = {
  email: string;
  password: string;
};
export const SignUp = () => {
  const { control, handleSubmit } = useForm<IForm>();

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const handleSingUp = ({ email, password }: IForm) => {
    if (!email || !password) {
      return Alert.alert('Cadastrar', 'Informe email e senha');
    }
    if (password.length < 6) {
      return Alert.alert(
        'Cadastrar',
        'A senha deve ter pelo menos 6 caracteres',
      );
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Cadastrar', 'Email já cadastrado');
        }
        return Alert.alert('Cadastrar', 'Não foi possível cadastrar ');
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Crie sua Conta
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
            secureTextEntry
            InputLeftElement={
              <Icon
                ml={3}
                as={<Octicons name="key" color={colors.gray[300]} />}
              />
            }
          />
        )}
      />

      <Button
        title="Cadastrar"
        w="full"
        onPress={handleSubmit(handleSingUp)}
        isLoading={isLoading}
      />
      <HStack alignItems="center" justifyContent="center" paddingTop={12}>
        <Text color="blueGray.300">Já possui cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SingIn')}>
          <Text color="green.400">Entre por aqui</Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};
