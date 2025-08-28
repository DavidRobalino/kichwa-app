// Este código define un hook useEvaluationById que utiliza useSWR para obtener una evaluación de un 
// curso específica, basándose en un lessonId y un evaluationId opcional. Si se especifica, también permite 
// que las preguntas sean desordenadas mediante el parámetro shuffled. El hook devuelve los datos de la evaluación, 
// un indicador de carga (loading), cualquier error y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { Evaluation } from 'src/models/Evaluation.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  evaluation?: Evaluation;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useEvaluationById(
  lessonId: number,
  evaluationId?: number,
  shuffled = false,
): IHookProfile {
  const { data, error, mutate } = useSWR<Evaluation>(
    evaluationId
      ? `/evaluations/${evaluationId}/from-lesson/${lessonId}?shuffled=${shuffled}`
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
    evaluation: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useEvaluationById;
