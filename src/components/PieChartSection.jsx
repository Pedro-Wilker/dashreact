import { useEffect, useState } from 'react';
import { Box, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import CityList from './CityList';
import {
  getStatusVisitaBreakdown,
  getStatusPublicacaoBreakdown,
  getStatusInstalacaoBreakdown,
} from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const MotionBox = motion(Box);

const COLORS = ['#3182ce', '#e53e3e', '#38a169', '#d69e2e'];

const PieChartSection = () => {
  const [visitaData, setVisitaData] = useState(null);
  const [publicacaoData, setPublicacaoData] = useState(null);
  const [instalacaoData, setInstalacaoData] = useState(null);
  const [selectedCities, setSelectedCities] = useState(null);
  const [activeChart, setActiveChart] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitaRes, publicacaoRes, instalacaoRes] = await Promise.all([
          getStatusVisitaBreakdown(),
          getStatusPublicacaoBreakdown(),
          getStatusInstalacaoBreakdown(),
        ]);

        setVisitaData({
          data: [
            { name: 'Aprovados', value: visitaRes.data.approvedPercentage, cities: visitaRes.data.approvedCities },
            { name: 'Reprovados', value: visitaRes.data.rejectedPercentage, cities: visitaRes.data.rejectedCities },
          ],
        });
        setPublicacaoData({
          data: [
            { name: 'Publicados', value: publicacaoRes.data.publishedPercentage, cities: publicacaoRes.data.publishedCities },
            { name: 'Ag. Publicação', value: publicacaoRes.data.awaitingPercentage, cities: publicacaoRes.data.awaitingPublicationCities },
          ],
        });
        setInstalacaoData({
          data: [
            { name: 'Instalados', value: instalacaoRes.data.installedPercentage, cities: instalacaoRes.data.installedCities },
            { name: 'Ag. Instalação', value: instalacaoRes.data.awaitingPercentage, cities: instalacaoRes.data.awaitingInstallationCities },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pie chart data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePieClick = (data, index) => {
    setSelectedCities(data.payload.cities);
  };

  const handlePieDoubleClick = () => {
    if (activeChart < 3) {
      setActiveChart(activeChart + 1);
      setSelectedCities(null);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box mt={10} width="90%" mx="auto">
      <Heading size="lg" mb={6}>Status das Visitas</Heading>
      <Flex direction="column" alignItems="center" gap={10}>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={visitaData.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
              onClick={handlePieClick}
              onDoubleClick={handlePieDoubleClick}
            >
              {visitaData.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {selectedCities && <CityList cities={selectedCities} />}
        </MotionBox>

        {activeChart >= 2 && (
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={FaArrowDown} boxSize={6} mb={4} />
            <PieChart width={400} height={400}>
              <Pie
                data={publicacaoData.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#82ca9d"
                label
                onClick={handlePieClick}
                onDoubleClick={handlePieDoubleClick}
              >
                {publicacaoData.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {selectedCities && <CityList cities={selectedCities} />}
          </MotionBox>
        )}

        {activeChart >= 3 && (
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={FaArrowDown} boxSize={6} mb={4} />
            <PieChart width={400} height={400}>
              <Pie
                data={instalacaoData.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#ffc107"
                label
                onClick={handlePieClick}
              >
                {instalacaoData.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {selectedCities && <CityList cities={selectedCities} />}
          </MotionBox>
        )}
      </Flex>
    </Box>
  );
};

export default PieChartSection;
