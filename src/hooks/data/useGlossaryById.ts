// Este código define un hook useGlossaryById que utiliza useSWR para obtener un glosario específico de 
// una lección, identificado por lessonId y glossaryId. El hook devuelve el glosario, un indicador de carga 
// (loading), cualquier error y una función mutate para forzar la revalidación de los datos.
import useSWR from 'swr';

import { Glossary } from 'src/models/Glossary.model';
import { fetcher } from './fetcher';

interface IHookProfile {
  glossary?: Glossary;
  error: Error;
  loading: boolean;
  mutate: () => void;
}

function useGlossaryById(lessonId: number, glossaryId?: number): IHookProfile {
  const { data, error, mutate } = useSWR<Glossary>(
    glossaryId ? `/lessons/${lessonId}/contents/${glossaryId}` : undefined,
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
    glossary: data,
    loading: !error && !data,
    error,
    mutate: () => mutate(),
  };
}

export default useGlossaryById;
