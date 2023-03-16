import { Input as NativeBaseInput, IInputProps } from 'native-base';

const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      {...rest}
      _focus={{
        borderWidth: 1,
        borderColor: 'green.500',
        bg: 'gray.700',
      }}
    />
  );
};
export { Input };
