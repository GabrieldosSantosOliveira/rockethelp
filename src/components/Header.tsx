import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from 'native-base';

type Props = StyledProps & {
  title: string;
};
export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <HStack
      w="full"
      justifyItems="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton
        icon={<AntDesign name="caretleft" color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
      />
      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
