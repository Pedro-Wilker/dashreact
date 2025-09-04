import { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CityList from './CityList';

const MotionBox = motion(Box);

const DashboardCard = ({ title, percentage, cities }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionBox
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      p={4}
      textAlign="center"
      whileHover={{ scale: 1.05, boxShadow: 'md' }}
      transition={{ duration: 0.2 }}
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
      aria-label={`Expand ${title} card`}
    >
      <VStack spacing={2}>
        <Text fontWeight="bold" fontSize="lg">{title}</Text>
        <Text fontSize="2xl" color="blue.500">{percentage}%</Text>
      </VStack>
      {isOpen && cities && <CityList cities={cities} />}
    </MotionBox>
  );
};

export default DashboardCard;
