import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: process.env.PROD ? 'https://visualpdf.com/api' : 'https://dev.localhost/api' });

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
