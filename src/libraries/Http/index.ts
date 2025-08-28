// Esta clase Http actúa como un wrapper para gestionar las peticiones HTTP (GET, POST, PUT, DELETE)
//  utilizando Axios. Define métodos para realizar solicitudes con diferentes tipos de datos, como FormData 
// o JSON. Cada método maneja errores mediante una función de manejo de errores (HandleAxiosError) y 
// devuelve la respuesta del servidor o el error procesado. Además, permite personalizar las cabeceras y 
// los datos enviados con las peticiones.
import AxiosInstance, { HandleAxiosError } from './axios-config.utils';

interface IFormDataParams {
  url: string;
  method?: 'POST' | 'PUT';
  body?: FormData;
  logged?: boolean;
}

interface IPostParams {
  url: string;
  headers?: any;
  body?: any;
  logged?: boolean;
}

interface IGetParams {
  url: string;
  headers?: any;
  logged?: boolean;
}

interface IResponseServer {
  statusCode: number;
  data?: any;
  message: string | string[];
}

// clase wrapper
// esta clase será la responsable de gestionar la lógica de las peticiones
// HTTP hacia el servidor con los diferentes verbos del protocolo
export class Http {
  static instance = new Http();

  private axios = AxiosInstance;

  async formData({
    url,
    body,
    method = 'POST',
  }: IFormDataParams): Promise<IResponseServer> {
    try {
      const res = await this.axios(url, {
        headers: { 'content-type': 'multipart/form-data' },
        method,
        data: body,
      });
      console.log(`[FORM-DATA] Response from ${url}`, res.data);
      return res.data;
    } catch (error) {
      console.error(`[http-form-data] ${url}`, error);
      const parsedError = HandleAxiosError(error);
      return parsedError;
    }
  }

  async post({ url, body = {} }: IPostParams): Promise<IResponseServer> {
    try {
      const res = await this.axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(`[POST] Response from ${url}`, res.data);
      return res.data;
    } catch (error: any) {
      console.error(`[POST] error ${url}`, error);
      const parsedError = HandleAxiosError(error);
      return parsedError;
    }
  }

  async get({ url, logged = false }: IGetParams): Promise<IResponseServer> {
    try {
      const res = await this.axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (logged) console.log(`[GET] Response from ${url}`, res.data);
      return res.data;
    } catch (error: any) {
      console.error(`[GET] error ${url}`, error);
      const parsedError = HandleAxiosError(error);
      return parsedError;
    }
  }

  async put({
    url,
    body = {},
    logged = false,
  }: IPostParams): Promise<IResponseServer> {
    try {
      const res = await this.axios.put(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (logged) console.log(`[PUT] Response from ${url}`, res.data);
      return res.data;
    } catch (error: any) {
      console.error(`[PUT] error ${url}`, error);
      const parsedError = HandleAxiosError(error);
      return parsedError;
    }
  }

  async delete({ url, body = {} }: IPostParams): Promise<IResponseServer> {
    try {
      const res = await this.axios.delete(url, {
        headers: { 'Content-Type': 'application/json' },
        data: body,
      });
      console.log(`[DELETE] Response from ${url}`, res.data);
      return res.data;
    } catch (error: any) {
      console.error(`[DELETE] error ${url}`, error);
      const parsedError = HandleAxiosError(error);
      return parsedError;
    }
  }
}
