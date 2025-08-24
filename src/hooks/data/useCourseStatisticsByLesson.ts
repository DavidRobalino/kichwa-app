// Este código define un hook useCourseStatisticsByLesson que utiliza la librería useSWR para obtener 
// estadísticas de un curso basadas en un lessonId específico. El hook devuelve los datos obtenidos, 
// un indicador de carga (loading), cualquier error que ocurra y una función mutate para forzar la revalidación 
// de los datos. La solicitud HTTP se realiza a través del fetcher.
import useSWR from 'swr';

import { StatisticsCourse } from 'src/models/StatisticsCourse.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  data?: StatisticsCourse;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useCourseStatisticsByLesson(lessonId?: number): IHookProfile {
  const { data, error, mutate } = useSWR<StatisticsCourse>(
    lessonId ? `/statistics/by-lessons/${lessonId}` : undefined,
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
    data: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useCourseStatisticsByLesson;
