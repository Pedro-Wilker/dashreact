import { useEffect, useState, lazy, Suspense } from 'react';
import { ChakraProvider, Box, Grid, extendTheme } from '@chakra-ui/react';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import MainSection from './components/MainSection';
import LoadingSpinner from './components/LoadingSpinner';
import {
  getVisitedCities,
  getStatusVisitaBreakdown,
  getStatusPublicacaoBreakdown,
  getStatusInstalacaoBreakdown,
} from './services/api';

const PieChartSection = lazy(() => import('./components/PieChartSection'));

const theme = extendTheme({
  colors: {
    brand: {
      500: '#3182ce',
    },
  },
});

function App() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const [visitedRes, visitaBreakdownRes, publicacaoRes, instalacaoRes] =
          await Promise.all([
            getVisitedCities(),
            getStatusVisitaBreakdown(),
            getStatusPublicacaoBreakdown(),
            getStatusInstalacaoBreakdown(),
          ]);

        setCardData({
          Visitados: {
            percentage: visitedRes.data.percentage,
            cities: visitedRes.data.visitedCities,
          },
          Aprovados: {
            percentage: visitaBreakdownRes.data.approvedPercentage,
            cities: visitaBreakdownRes.data.approvedCities,
          },
          Reprovados: {
            percentage: visitaBreakdownRes.data.rejectedPercentage,
            cities: visitaBreakdownRes.data.rejectedCities,
          },
          Publicados: {
            percentage: publicacaoRes.data.publishedPercentage,
            cities: publicacaoRes.data.publishedCities,
          },
          Instalados: {
            percentage: instalacaoRes.data.installedPercentage,
            cities: instalacaoRes.data.installedCities,
          },
          'Aguardando Instalacao': {
            percentage: instalacaoRes.data.awaitingPercentage,
            cities: instalacaoRes.data.awaitingInstallationCities,
          },
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch card data');
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50">
        <Header />
        {loading && <LoadingSpinner />}
        {error && <Box p={4} color="red.500" textAlign="center">{error}</Box>}
        {!loading && !error && (
          <>
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={6}
              p={6}
              maxW="1200px"
              mx="auto"
            >
              {Object.entries(cardData).map(([title, { percentage, cities }]) => (
                <DashboardCard
                  key={title}
                  title={title}
                  percentage={percentage}
                  cities={cities}
                />
              ))}
            </Grid>
            <MainSection />
            <Suspense fallback={<LoadingSpinner />}>
              <PieChartSection />
            </Suspense>
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
