import { useState } from "react";
import { VStack, Heading, Icon, useTheme, Text } from "native-base";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { Key, Envelope } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { colors } = useTheme();
  const handleSingUp = () => {
    if (!email || !password) {
      return Alert.alert("Cadastrar", "Informe email e senha");
    }
    if (password.length < 6) {
      return Alert.alert(
        "Cadastrar",
        "A senha deve ter pelo menos 6 caracteres"
      );
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/invalid-email") {
          return Alert.alert("Cadastrar", "Email já cadastrado");
        }
        return Alert.alert("Cadastrar", "Não foi possível cadastrar ");
      });
  };
  const handleSingIn = () => {
    navigation.navigate("SingIn");
  };
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Crie sua Conta
      </Heading>
      <Input
        placeholder="Email"
        marginBottom={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} />}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Cadastrar"
        w="full"
        onPress={handleSingUp}
        isLoading={isLoading}
      />
      <Text alignSelf="flex-start" color="blueGray.300" mt={8}>
        Já possui cadastro?{" "}
        <Text color="green.400" onPress={handleSingIn}>
          Entre por aqui
        </Text>
      </Text>
    </VStack>
  );
};
export { SignUp };
