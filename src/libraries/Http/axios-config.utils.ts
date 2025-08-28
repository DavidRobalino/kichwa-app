// Este código configura una instancia de Axios para realizar peticiones HTTP con autenticación mediante 
// tokens de acceso y refresco. Utiliza interceptores para agregar los tokens a las cabeceras de las solicitudes 
// y para almacenar los nuevos tokens de autenticación recibidos en las respuestas. También maneja la lógica de 
// renovación de tokens en caso de que el token de acceso haya expirado. Además, implementa una función para manejar
//  errores de red y del servidor, proporcionando mensajes claros en caso de fallos.
import Constants from 'expo-constants';
import axios, { AxiosInstance } from 'axios';

import { Storage } from '../Storage';

export const ACCESS_TOKEN = '_ast';
export const REFRESH_TOKEN = '_rat';

const APP_NAME = Constants.expoConfig?.android?.package;
const APP_VERSION = Constants.expoConfig?.version;

// configuración base de axios
const instance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Authorization:
      (process.env.EXPO_PUBLIC_API_KEY as string) || 'unauthenticated',
    // 'Content-Type': 'application/json',
    'app-name': APP_NAME,
    'app-version': APP_VERSION,
  },
  withCredentials: true,
  timeout: 15000,
});

// se agregan interceptores al momento de hacer la petición
// hacia el servidor para "inyectar" los jwt de acceso y refresco
instance.interceptors.request.use(
  async (config) => {
    const accessToken = await Storage.instance.get<string>({
      key: ACCESS_TOKEN,
    });
    const refreshToken = await Storage.instance.get<string>({
      key: REFRESH_TOKEN,
    });
    if (config.headers) {
      config.headers['Authorization'] =
        (process.env.EXPO_PUBLIC_API_KEY as string) || 'unauthenticated';
      config.headers['app-name'] = APP_NAME;
      config.headers['app-version'] = APP_VERSION;
      config.headers[
        'cookie'
      ] = `${ACCESS_TOKEN}=${accessToken};, ${REFRESH_TOKEN}=${refreshToken};`;
    }
    config.timeout = 15000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// se agrega interceptores al momento de recibir la respuesta
// del servidor para guardar en local-storage los tokens de autentificación
instance.interceptors.response.use(
  async (res) => {
    if (res.headers['set-cookie']) {
      const cookies =
        typeof res.headers['set-cookie'] !== 'string'
          ? res.headers['set-cookie'][0].split(';, ')
          : (res.headers['set-cookie'] as string).split(';, ');
      // save access cookies
      cookies.forEach((cookie) => {
        const [key, value] = cookie.split(';')[0].split('=');
        if (key === ACCESS_TOKEN) {
          // access token
          Storage.instance.store({ key, value });
        } else if (key === REFRESH_TOKEN) {
          // refresh token
          Storage.instance.store({ key, value });
        }
      });
    }
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // error from refresh endpoint (expired/removed refresh token)
    if (originalConfig.url === '/auth/refresh') return Promise.reject(err);
    // normal way to handle error
    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await instance.get('/auth/refresh');
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);

// función que será de utilidad para procesar los errores provenientes desde el servidor
export function HandleAxiosError(error: any) {
  if (error?.response?.data) {
    return {
      statusCode: error.response.status,
      data: null,
      message: error.response.data.message,
    };
  }
  let message = error?.message || 'Error, intenta de nuevo 1';

  if (error) {
    message = (error.message as string).includes('Network')
      ? 'Error de red, intenta de nuevo'
      : (error.message as string).includes('timeout')
      ? 'Error de conexión, intenta de nuevo'
      : message;
  }
  return { statusCode: 500, data: null, message };
}

export default instance;
