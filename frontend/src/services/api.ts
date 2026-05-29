import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const cryptoApi = {
  getTopCoins: async (limit = 10) => {
    const response = await axios.get(`${API_URL}/coins/top`, { params: { limit } });
    return response.data;
  },
  getTrendingCoins: async () => {
    const response = await axios.get(`${API_URL}/coins/trending`);
    return response.data;
  },
  getNews: async () => {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  },
  getCoinDetails: async (id: string) => {
    const response = await axios.get(`${API_URL}/coins/${id}`);
    return response.data;
  },
  getMarketSentiment: async () => {
    const response = await axios.get(`${API_URL}/market/sentiment`);
    return response.data;
  },
  getWatchlist: async () => {
    const response = await axios.get(`${API_URL}/watchlist`);
    return response.data;
  },
  addToWatchlist: async (coinId: string) => {
    const response = await axios.post(`${API_URL}/watchlist`, { coin_id: coinId });
    return response.data;
  },
  removeFromWatchlist: async (coinId: string) => {
    const response = await axios.delete(`${API_URL}/watchlist/${coinId}`);
    return response.data;
  },
  getAnalysis: async (id: string) => {
    const response = await axios.get(`${API_URL}/coins/${id}/analysis`);
    return response.data;
  },
  getCoinHistory: async (id: string, days = 7) => {
    const response = await axios.get(`${API_URL}/coins/${id}/history`, { params: { days } });
    return response.data;
  },
};
