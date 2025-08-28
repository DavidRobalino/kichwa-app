// Este código define una función fetcher que realiza una solicitud HTTP GET utilizando la clase Http.
//  Si la respuesta del servidor no tiene un código de estado en el rango 200-299, se lanza un error con 
// el mensaje de la respuesta. En caso contrario, retorna los datos obtenidos de la respuesta.
import { Http } from 'src/libraries/Http';

export const fetcher = async (url: string) => {
  // console.info('request', url);
  // const http = new Http();
  const res = await Http.instance.get({ url });
  console.info(url, `${res.statusCode} ${res.message}`);
  // Si el status code no esta en el rango 200-299,
  // seguimos intentando analizarlo y lanzarlo.
  // request error (network)
  if (res.statusCode !== 200) {
    throw new Error(res.message + '');
  }
  return res.data;
};
