// Este código define un hook useFeedbackById que utiliza useSWR para obtener la retroalimentación de un 
// usuario sobre una evaluación específica, basándose en los parámetros evaluationId y userEvaluationId. 
// El hook devuelve la evaluación del usuario, un indicador de carga (loading), cualquier error y una 
// función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { UserEvaluation } from 'src/models/UserEvaluation.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  userEvaluation?: UserEvaluation;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useFeedbackById(
  evaluationId: number,
  userEvaluationId: number,
): IHookProfile {
  const { data, error, mutate } = useSWR<UserEvaluation>(
    evaluationId
      ? `/evaluations/${evaluationId}/feedback/${userEvaluationId}`
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
    userEvaluation: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useFeedbackById;
