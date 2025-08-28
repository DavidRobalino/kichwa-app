// Este código define un hook useMyCourses que utiliza useSWR para obtener los cursos asociados al usuario
//  actual mediante la ruta /courses/my-courses. El hook devuelve los cursos, un indicador de carga (loading), 
// cualquier error y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { Course } from 'src/models/Course.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  courses: Course[];
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useMyCourses(): IHookProfile {
  const { data, error, mutate } = useSWR<Course[]>(
    '/courses/my-courses',
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
    courses: data || [],
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useMyCourses;
