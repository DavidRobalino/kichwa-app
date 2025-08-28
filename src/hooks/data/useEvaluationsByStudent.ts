// Este código define un hook useEvaluationsByStudent que utiliza useSWR para obtener las evaluaciones 
// de un estudiante en un curso específico, basándose en el courseId y el userId del estudiante. El hook
//  devuelve un arreglo de evaluaciones del estudiante, un indicador de carga (loading), cualquier error 
// y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { StudentEvaluation } from 'src/models/StudentEvaluation.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  studentEvaluations: StudentEvaluation[];
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useEvaluationsByStudent(
  courseId: number,
  userId: number,
): IHookProfile {
  const { data, error, mutate } = useSWR<StudentEvaluation[]>(
    courseId
      ? `/evaluations/by-course/${courseId}/students/${userId}`
      : undefined,
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
    studentEvaluations: data || [],
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useEvaluationsByStudent;
