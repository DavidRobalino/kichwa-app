// Este código define un hook useStudentProgress que utiliza useSWR para obtener el progreso de un 
// estudiante desde la ruta /statistics/user-progress. Devuelve el progreso del estudiante, un indicador 
// de carga (loading), posibles errores y una función para forzar la revalidación de los datos (mutate).
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { StudentProgress } from 'src/models/StudentProgress.model';

interface IHookProfile {
  studentProgress?: StudentProgress;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useStudentProgress(): IHookProfile {
  const { data, error, mutate } = useSWR<StudentProgress>(
    `/statistics/user-progress`,
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
    studentProgress: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useStudentProgress;
