import { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Key, Envelope } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
const SingIn = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { colors } = useTheme();
  const handleSingIn = () => {
    console.log(name, password);
  };
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua Conta
      </Heading>
      <Input
        placeholder="Email"
        marginBottom={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} />}
        onChangeText={setName}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" w="full" onPress={handleSingIn} />
    </VStack>
  );
};
export { SingIn };
