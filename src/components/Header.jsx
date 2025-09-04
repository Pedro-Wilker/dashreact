import { Box, Flex, Text, Image } from '@chakra-ui/react';
import logo from '../assets/logo.svg';

const Header = () => (
  <Flex
    as="header"
    bg="white"
    boxShadow="sm"
    p={4}
    justifyContent="space-between"
    alignItems="center"
  >
    <Flex alignItems="center">
      <Image src={logo} alt="Logo" boxSize="40px" mr={4} />
      <Box>
        <Text fontSize="2xl" fontWeight="bold">SAEB</Text>
        <Text fontSize="2xl" fontWeight="bold">SAC</Text>
        <Text fontSize="2xl" fontWeight="bold">DOS</Text>
      </Box>
    </Flex>
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      p={4}
      textAlign="center"
    >
      <Text fontSize="2xl" fontWeight="bold">343</Text>
      <Text fontSize="lg">Municipios</Text>
    </Box>
  </Flex>
);

export default Header;
