import axios from 'axios';

// Helper to get token from cookies
const getTokenFromCookies = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const useAxiosAuth = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // your backend API base URL
    withCredentials: true, // ⬅️ Important if backend uses credentials/cookies
  });

  instance.interceptors.request.use((config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxiosAuth;
