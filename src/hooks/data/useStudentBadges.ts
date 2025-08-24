// Este código define un hook useStudentBadges que utiliza useSWR para obtener las insignias de un 
// estudiante desde la ruta /statistics/user-badges. Devuelve las insignias del estudiante, un indicador 
// de carga (loading), posibles errores, y una función para forzar la revalidación de los datos (mutate).
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { StudentBadges } from 'src/models/StudentBadges.model';

interface IHookProfile {
  studentBadges?: StudentBadges;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useStudentBadges(): IHookProfile {
  const { data, error, mutate } = useSWR<StudentBadges>(
    `/statistics/user-badges`,
    fetcher,
    {
      errorRetryCount: 2,
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    studentBadges: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useStudentBadges;
