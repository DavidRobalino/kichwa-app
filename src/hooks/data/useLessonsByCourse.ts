// Este código define un hook useLessonsByCourse que utiliza useSWR para obtener las lecciones asociadas
//  a un curso específico mediante su courseId. El hook devuelve las lecciones, un indicador de carga (loading),
//  cualquier error y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { Lesson } from 'src/models/Lesson.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  lessons: Lesson[];
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useLessonsByCourse(courseId?: number): IHookProfile {
  const { data, error, mutate } = useSWR<Lesson[]>(
    courseId ? `/lessons/by-course/${courseId}` : undefined,
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
    lessons: data || [],
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useLessonsByCourse;
