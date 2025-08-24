// Este código define un hook useStudentWeeklyLogs que utiliza useSWR para obtener los registros semanales de 
// un estudiante desde la API. Devuelve los datos de los registros, un indicador de carga (loading), posibles errores 
// y una función para forzar la revalidación de los datos (mutate).
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { StudentWeeklyLogs } from 'src/models/StudentWeeklyLogs';

interface IHookProfile {
  studentWeeklyLogs?: StudentWeeklyLogs;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useStudentWeeklyLogs(): IHookProfile {
  const { data, error, mutate } = useSWR<StudentWeeklyLogs>(
    `/statistics/user-weekly-logs`,
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
    studentWeeklyLogs: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useStudentWeeklyLogs;
