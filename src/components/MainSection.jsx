import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  LabelList,
} from 'recharts';
import {
  getAmploGeral,
  getTopCities,
  getGeralMensal,
} from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const MainSection = () => {
  const [visits, setVisits] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [topCities, setTopCities] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [amploRes, topCitiesRes, mensalRes] = await Promise.all([
          getAmploGeral(),
          getTopCities(),
          getGeralMensal(),
        ]);

        const today = new Date();
        const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const filteredVisits = amploRes.data.filter(
          (city) =>
            city.data_visita &&
            new Date(city.data_visita) <= sevenDaysFromNow &&
            new Date(city.data_visita) >= today
        );

        const filteredInstallations = amploRes.data.filter(
          (city) =>
            city.data_instalacao &&
            new Date(city.data_instalacao) <= sevenDaysFromNow &&
            new Date(city.data_instalacao) >= today
        );

        setVisits(filteredVisits);
        setInstallations(filteredInstallations);
        setTopCities(topCitiesRes.data);
        setMonthlyData(mensalRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      p={6}
      mt={6}
      width="90%"
      mx="auto"
    >
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <GridItem>
          <Heading size="md" mb={4}>Visitas da Semana</Heading>
          <List spacing={2}>
            {visits.map((city) => (
              <ListItem key={city.id}>{city.nome_municipio}</ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem>
          <Heading size="md" mb={4}>Cidades com maior produção de CINs</Heading>
          <BarChart
            width={500}
            height={300}
            data={topCities}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="nome_municipio" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_quantidade" fill="#3182ce" name="Quantidade">
              <LabelList dataKey="total_quantidade" position="right" />
            </Bar>
          </BarChart>
        </GridItem>
        <GridItem>
          <Heading size="md" mb={4}>Instalações da Semana</Heading>
          <List spacing={2}>
            {installations.map((city) => (
              <ListItem key={city.id}>{city.nome_municipio}</ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem>
          <Heading size="md" mb={4}>Produção CIN em todo lugar</Heading>
          <LineChart
            width={500}
            height={300}
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantidade" stroke="#3182ce">
              <LabelList dataKey="quantidade" position="top" />
            </Line>
          </LineChart>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainSection;
