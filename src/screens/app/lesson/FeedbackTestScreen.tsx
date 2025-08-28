// Componente FeedbackTestScreen que muestra los resultados de una prueba de evaluación, incluyendo las respuestas del estudiante y su puntaje.
// Dependiendo del tipo de pregunta, se muestra el componente adecuado para visualizarlas (verdadero/falso, opción múltiple, o completar).
// También muestra un botón para volver y el puntaje final con un ícono que indica si el estudiante aprobó o no según la puntuación obtenida.
import { AntDesign } from '@expo/vector-icons';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import DisplayCompleteQuestion from 'src/components/test/display-questions/DisplayCompleteQuestion';
import DisplayOptionMultipleQuestion from 'src/components/test/display-questions/DisplayOptionMultipleQuestion';
import DisplayTrueOrFalseQuestion from 'src/components/test/display-questions/DisplayTrueOrFalseQuestion';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useFeedbackById from 'src/hooks/data/useFeedbackById';
import { QuestionType } from 'src/models/Question.model';
import {
  FeedbackTestScreenRouteProps,
  LessonScreenNavigationProps,
} from 'src/navigation/navigation.types';

const FeedbackTestScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProps>();
  const { params } = useRoute<FeedbackTestScreenRouteProps>();
  const { userEvaluation, loading, error, mutate } = useFeedbackById(
    params.evaluationId,
    params.userEvaluationId,
  );

  const score = useMemo(() => {
    if (!userEvaluation) return 0;
    return userEvaluation.score;
  }, [userEvaluation]);

  useEffect(() => {
    navigation.setOptions({ title: params.title });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[GlobalStyles.body, { rowGap: 20 }]}>
          {loading && <Text>cargando...</Text>}
          {!loading && error && <Text>{error.message}</Text>}
          {!loading &&
            !error &&
            userEvaluation &&
            userEvaluation.studentAnswers.map((answer, index) => (
              <React.Fragment key={answer.id}>
                {answer.type === QuestionType.TRUE_FALSE && (
                  <DisplayTrueOrFalseQuestion
                    index={index}
                    question={answer.questionText}
                    options={answer.options}
                  />
                )}
                {answer.type === QuestionType.MULTIPLE_CHOICE && (
                  <DisplayOptionMultipleQuestion
                    index={index}
                    question={answer.questionText}
                    options={answer.options}
                  />
                )}
                {answer.type === QuestionType.COMPLETE && (
                  <DisplayCompleteQuestion
                    index={index}
                    question={answer.questionText}
                    options={answer.options}
                  />
                )}
              </React.Fragment>
            ))}
        </View>
      </ScrollView>
      <View style={styles.bottomCard}>
        <View style={{ flexShrink: 1 }}>
          <Button
            onClick={() => navigation.goBack()}
            text="Volver"
            buttonColor={Colors.white}
            textColor={Colors.black}
            borderColor={Colors.gray}
            width={125}
          />
        </View>
        <View style={styles.scoreContainer}>
          <Text
            style={[
              styles.scoreText,
              { color: score >= 14 ? Colors.green : Colors.red },
            ]}
          >
            <Text>{userEvaluation?.score || 0}</Text>
            <Text>/</Text>
            <Text>20</Text>
          </Text>
          <AntDesign
            name="checksquareo"
            size={30}
            color={score >= 14 ? Colors.green : Colors.grayDark} // Ícono verde si la nota es mayor a 14
            accessibilityLabel={score >= 14 ? 'Aprobado' : 'No aprobado'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackTestScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    paddingBottom: 64,
  },
  bottomCard: {
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
