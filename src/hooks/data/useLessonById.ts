// Este código define un hook useLessonById que utiliza useSWR para obtener los detalles de una lección 
// específica mediante su lessonId. El hook devuelve la lección, un indicador de carga (loading), 
// cualquier error y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { Lesson } from 'src/models/Lesson.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  lesson?: Lesson;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

// GET /lessons/:id
function useLessonById(lessonId?: number): IHookProfile {
  const { data, error, mutate } = useSWR<Lesson>(
    lessonId ? `/lessons/${lessonId}` : undefined, // /lessons/:id
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
    lesson: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useLessonById;
