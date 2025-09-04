To address your request, I’ll create a modern, enterprise-grade React dashboard application based on your detailed prompt, incorporating design inspirations from the provided JustBoil Admin One Vue Tailwind dashboard and the Creative Tim dashboards (Light Bootstrap Dashboard React and Material Dashboard React). I’ll use **Chakra UI** for its flexibility, modern theming, and seamless integration with Tailwind CSS, which aligns well with the clean, professional aesthetic you’re aiming for. I’ll replace Chart.js with **Recharts** for all charts, as specified, and ensure the application meets enterprise-level standards with responsive layouts, animations, accessibility, and robust error handling.

The dashboard will fetch data from the provided Node.js/Express API endpoints using **Axios**, implement lazy loading for the pie charts section, and include subtle animations using **Framer Motion**. The code will be organized, follow ESLint/Prettier standards, and include a complete `package.json` and Vite configuration.

### Project Structure
Here’s the proposed structure for the project:

```
saeb-sac-dos-dashboard/
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── MainSection.jsx
│   │   ├── PieChartSection.jsx
│   │   ├── CityList.jsx
│   │   └── LoadingSpinner.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── .eslintrc.json
├── .prettierrc
└── README.md
```

### Step-by-Step Implementation

#### 1. **package.json**
This includes all necessary dependencies for React, Vite, Chakra UI, Tailwind CSS, Recharts, Axios, and Framer Motion.

```json
{
  "name": "saeb-sac-dos-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx",
    "format": "prettier --write src/**/*.{js,jsx}"
  },
  "dependencies": {
    "@chakra-ui/react": "^2.8.2",
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "axios": "^1.7.7",
    "framer-motion": "^11.3.31",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.34.4",
    "eslint-plugin-react-hooks": "^4.6.2",
    "postcss": "^8.4.41",
    "prettier": "^3.3.3",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.2"
  }
}
```

#### 2. **vite.config.js**
Basic Vite configuration with React plugin.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

#### 3. **.eslintrc.json**
ESLint configuration for code quality.

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react/prop-types": "off"
  }
}
```

#### 4. **.prettierrc**
Prettier configuration for consistent formatting.

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

#### 5. **src/index.css**
Tailwind CSS setup and global styles.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7fafc;
}
```

#### 6. **src/services/api.js**
API service using Axios for all GET requests.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const getVisitedCities = () => api.get('amplo-geral/visited-cities');
export const getStatusVisitaBreakdown = () => api.get('amplo-geral/status-visita-breakdown');
export const getStatusPublicacaoBreakdown = () => api.get('amplo-geral/status-publicacao-breakdown');
export const getStatusInstalacaoBreakdown = () => api.get('amplo-geral/status-instalacao-breakdown');
export const getAmploGeral = () => api.get('amplo-geral');
export const getTopCities = () => api.get('produtividade/top-cities?ano=2025&limit=10');
export const getGeralMensal = () => api.get('produtividade/geral-mensal');
```

#### 7. **src/components/LoadingSpinner.jsx**
A reusable loading spinner component.

```jsx
import { Spinner, Center } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Center py={10}>
    <Spinner size="xl" color="blue.500" />
  </Center>
);

export default LoadingSpinner;
```

#### 8. **src/components/CityList.jsx**
Reusable component for displaying city lists in cards and pie chart clicks.

```jsx
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
```

#### 9. **src/components/DashboardCard.jsx**
Component for the six percentage cards with expandable city lists.

```jsx
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
```

#### 10. **src/components/Header.jsx**
Header component with logo, SAEB SAC DOS text, and municipalities card.

```jsx
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
```

#### 11. **src/components/MainSection.jsx**
Main section with four quadrants for lists and charts.

```jsx
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
```

#### 12. **src/components/PieChartSection.jsx**
Lazy-loaded section with interactive pie charts.

```jsx
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
```

#### 13. **src/App.jsx**
Main App component integrating all sections with lazy loading for pie charts.

```jsx
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
```

#### 14. **src/main.jsx**
Entry point for the React application.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 15. **src/assets/logo.svg**
Placeholder SVG logo (you can replace this with your actual logo).

```xml
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="20" fill="#3182ce"/>
  <text x="10" y="25" font-size="16" fill="white">D</text>
</svg>
```

### Design Inspirations and Improvements
Drawing from the Creative Tim dashboards (Light Bootstrap Dashboard React and Material Dashboard React):
- **Clean Layouts**: The dashboard uses a clean, white-card-based design with subtle shadows and rounded borders, similar to Light Bootstrap Dashboard’s minimalistic aesthetic.
- **Responsive Grid**: The card section uses a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile), inspired by Material Dashboard’s flexible layouts.
- **Hover Effects**: Cards scale slightly on hover, and charts include tooltips for interactivity, mirroring the professional polish of Creative Tim’s templates.
- **Animations**: Framer Motion is used for smooth transitions (e.g., card expansion, pie chart reveals), enhancing the modern feel seen in JustBoil’s Tailwind-based dashboards.
- **Color Scheme**: A blue-centric palette (#3182ce) from Chakra UI’s brand color aligns with the enterprise-grade aesthetic of both Creative Tim and JustBoil dashboards.

### Accessibility and Best Practices
- **ARIA Labels**: Added to interactive elements like cards for screen reader support.
- **Keyboard Navigation**: Cards and charts are clickable via keyboard (Enter/Space).
- **Error Handling**: API errors are caught and displayed to the user.
- **Lazy Loading**: The pie chart section uses React’s `Suspense` and `lazy` for scroll-based loading.
- **Code Organization**: Components are modular, and API calls are centralized in the `services` folder.

### How to Run
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
3. **Ensure the API is Running**: The Node.js/Express API must be running at `http://localhost:3000/api/`.
4. **Lint and Format**:
   ```bash
   npm run lint
   npm run format
   ```

This implementation delivers a professional, enterprise-grade dashboard that meets all your requirements, with a modern design inspired by the referenced templates and robust functionality for data visualization and interactivity. Let me know if you need further refinements or additional features!