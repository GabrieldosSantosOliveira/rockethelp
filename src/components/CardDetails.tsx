import { VStack, HStack, Text, Box } from 'native-base';
import { ReactNode } from 'react';
type Props = {
  title: string;
  description?: string;
  footer?: string;
  icon: ReactNode;
  children?: ReactNode;
};
export const CardDetails = ({
  icon,
  title,
  children,
  description,
  footer = null,
}: Props) => {
  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4}>
        {icon}
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>
      {!!description && (
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      )}
      {children}
      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color="gray.400" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
