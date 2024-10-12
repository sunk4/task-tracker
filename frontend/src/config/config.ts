import { Configuration } from '../api';

const basePath = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088/api/v1';
console.log('Base Path:', basePath); // Log to check the value

export const configWithOutToken = new Configuration({
  basePath: basePath.replace(/\/+$/, ''),
});
