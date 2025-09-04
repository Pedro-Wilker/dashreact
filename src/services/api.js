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
