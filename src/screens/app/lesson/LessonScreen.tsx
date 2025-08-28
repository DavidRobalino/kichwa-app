// Componente LessonScreen que muestra los detalles de una lección, incluidos los contenidos, recursos y evaluación.
// Permite al usuario ver el último intento de evaluación o tomar una nueva prueba.
// Registra la interacción del usuario con la lección y maneja la carga, errores y el contenido de la lección.
// Utiliza navegación para redirigir al usuario a otras pantallas, como ver la evaluación o tomar la prueba.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import ContentsLesson from 'src/components/lesson/ContentsLesson';
import LastAttemptSummary from 'src/components/lesson/LastAttemptSummary';
import ResourcesList from 'src/components/lesson/ResourcesList';
import { Colors } from 'src/constants/Colors';
import useLessonById from 'src/hooks/data/useLessonById';
import { ActionType } from 'src/models/UserInteraction.model';
import { ScreensNames } from 'src/navigation/constants';
import {
  LessonScreenNavigationProps,
  LessonScreenRouteProps,
} from 'src/navigation/navigation.types';
import { InteractionUtils } from 'src/utils/Interaction.util';

const LessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProps>();
  const { params } = useRoute<LessonScreenRouteProps>();
  const { lesson, loading, error, mutate } = useLessonById(params.lessonId);

  const haveLesson = useMemo(() => {
    if (!lesson) return false;
    if (lesson.evaluations.length === 0) return false;
    if (lesson.evaluations[0].userEvaluations.length === 0) return false;
    return true;
  }, [lesson]);

  useEffect(() => {
    navigation.setOptions({ title: params.lessonName });
  }, []);

  useEffect(() => {
    const tout = setTimeout(() => {
      InteractionUtils.registerUserInteraction(
        params.lessonId,
        ActionType.VIEW_LESSON,
      );
    }, InteractionUtils.MIN_TIMEOUT_TIME);

    return () => {
      if (tout) clearTimeout(tout);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          {loading && <Text>cargando...</Text>}
          {!loading && error && <Text>{error.message}</Text>}
          {!loading && !error && lesson && (
            <>
              <Text style={styles.description}>{lesson.description}</Text>
              <Text style={styles.textTitle}>Contenidos</Text>
              <ContentsLesson glossaries={lesson.glossaries} />
              <Text style={styles.textTitle}>Recursos</Text>
              <ResourcesList resources={lesson.resources} />
              <Text style={styles.textTitle}>Evaluación</Text>
              {haveLesson && (
                <>
                  <LastAttemptSummary
                    attempt={lesson.evaluations[0].userEvaluations[0]}
                  />
                  <View style={{ marginVertical: 16 }}>
                    <Button
                      onClick={() =>
                        navigation.navigate(
                          ScreensNames.app.feedbackTest as 'feedback-test',
                          {
                            userEvaluationId:
                              lesson.evaluations[0].userEvaluations[0].id,
                            evaluationId:
                              lesson.evaluations[0].userEvaluations[0]
                                .evaluationId,
                            title: `Evaluación: ${params.lessonName}`,
                          },
                        )
                      }
                      text="Ver ultimo intento"
                      buttonColor={Colors.primary}
                    />
                  </View>
                  <View style={{ marginVertical: 16 }}>
                    <Button
                      onClick={() =>
                        navigation.navigate(ScreensNames.app.test as 'test', {
                          evaluationId: lesson.evaluations[0].id,
                          lessonId: params.lessonId,
                          title: `Evaluación ${params.lessonName}`,
                        })
                      }
                      text="Tomar prueba"
                      buttonColor={Colors.accent}
                    />
                  </View>
                </>
              )}
              {!haveLesson && (
                <View style={{ marginVertical: 16 }}>
                  <Button
                    onClick={() =>
                      navigation.navigate(ScreensNames.app.test as 'test', {
                        evaluationId: lesson.evaluations[0].id,
                        lessonId: params.lessonId,
                        title: `Evaluación ${params.lessonName}`,
                      })
                    }
                    text="Tomar prueba"
                    buttonColor={Colors.accent}
                  />
                </View>
              )}
            </>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default LessonScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    paddingTop: 8,
  },
  container: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
