import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CityList = ({ cities }) => (
  <MotionBox
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
    overflow="hidden"
  >
    <List spacing={2} p={4}>
      {cities.map((city, index) => (
        <ListItem key={index}>
          <Text fontSize="sm">{city.nome_municipio}</Text>
        </ListItem>
      ))}
    </List>
  </MotionBox>
);

export default CityList;
