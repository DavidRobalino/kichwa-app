// Este código define un hook useProfile que utiliza useSWR para obtener los datos del perfil del usuario 
// desde la ruta /profile. Devuelve el perfil del usuario, un indicador de carga (loading), posibles errores,
//  y proporciona funciones para actualizar el perfil localmente (mutateLocal), limpiar los datos del perfil 
// (cleanProfile), y forzar la revalidación de los datos (mutate).
import useSWR from 'swr';

import { Profile } from 'src/models/Profile.model';
import { fetcher } from './fetcher';


interface IHookProfile {
  me: Profile;
  error: Error;
  loading: boolean;
  mutate: () => void;
  mutateLocal: (data: Profile) => void;
  cleanProfile: () => void;
}

function useProfile(): IHookProfile {
  const { data, error, mutate } = useSWR('/profile', fetcher, {
    revalidateOnMount: false,
    errorRetryCount: 2,
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    me: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
    mutateLocal: (newData: Profile) =>
      mutate(
        { ...data, ...newData },
        { revalidate: true, populateCache: true },
      ),
    cleanProfile: () => mutate(undefined, false),
  };
}

export default useProfile;
