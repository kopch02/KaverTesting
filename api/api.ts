import axios from 'axios';
import Config from 'react-native-config';

console.log(Config);

// const API_ACCESS = Config.API_ACCESS;
const API_ACCESS = 'Bh-shZnkVd9kBU1QFl0-XMHNZUg0CY1e3-bekZY-kxY';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${API_ACCESS}`,
  },
});

export default unsplashApi;
