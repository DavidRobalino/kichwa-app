// Este código define un hook useStudentsByCourse que utiliza useSWR para obtener información 
// sobre los estudiantes de un curso específico, incluyendo el número total de lecciones y los estudiantes 
// asociados. Devuelve los datos de los estudiantes, un indicador de carga (loading), posibles errores y una 
// función para forzar la revalidación de los datos (mutate).
import useSWR from 'swr';

import { User } from 'src/models/User.model';
import { fetcher } from './fetcher';

type IStudentsData = {
  totalLessons: number;
  students: User[];
};

interface IHookProfile {
  data?: IStudentsData;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useStudentsByCourse(courseId?: number): IHookProfile {
  const { data, error, mutate } = useSWR<IStudentsData>(
    courseId ? `/courses/${courseId}/students` : undefined,
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

export default useStudentsByCourse;
