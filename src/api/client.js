import axios from 'axios';

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ?? 'https://panda-market-api.vercel.app',
  timeout: 10000,
});
