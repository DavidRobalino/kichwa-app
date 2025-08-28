// Componente TestScreen para manejar la evaluación de un usuario en una prueba.
// Carga la evaluación desde un ID, almacena las respuestas y permite la navegación entre preguntas.
// Valida que las respuestas sean completadas antes de avanzar o enviar la prueba.
// Guarda el intento en el servidor y muestra alertas en caso de errores o confirmaciones.
// Previene la salida accidental de la pantalla sin guardar el progreso.
// Utiliza `useEffect` para inicializar datos y actualizar el título de la pantalla.
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import ProgressBarTest from 'src/components/test/ProgressBarTest';
import QuestionController from 'src/components/test/show-questions/QuestionController';
import { Colors } from 'src/constants/Colors';
import useEvaluationById from 'src/hooks/data/useEvaluationById';
import { Http } from 'src/libraries/Http';
import { QuestionType } from 'src/models/Question.model';
import {
  LessonScreenNavigationProps,
  TestScreenRouteProps,
} from 'src/navigation/navigation.types';
import useEvaluationStore from 'src/stores/useEvaluationStore';

const TestScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProps>();
  const { params } = useRoute<TestScreenRouteProps>();
  const { answers, setAnswers, setStartTime, startTime } = useEvaluationStore();
  const { evaluation, loading, error } = useEvaluationById(
    params.lessonId,
    params.evaluationId,
    true,
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const isEndingEvaluationRef = useRef(false);

  const handleNextQuestion = (withReturn = false) => {
    const value = answers[questionIndex];
    const hasAnswer = value.options.some((opt) => opt.isChoose);
    if (value.type === QuestionType.TRUE_FALSE && !hasAnswer) {
      if (withReturn) return false;
      return Alert.alert(
        'Advertencia',
        'Debes seleccionar al menos una respuesta',
      );
    } else if (value.type === QuestionType.COMPLETE && !hasAnswer) {
      if (withReturn) return false;
      return Alert.alert('Advertencia', 'Debes ingresar una respuesta');
    } else if (value.type === QuestionType.MULTIPLE_CHOICE && !hasAnswer) {
      if (withReturn) return false;
      return Alert.alert(
        'Advertencia',
        'Debes seleccionar al menos una respuesta',
      );
    }
    if (withReturn) return true;
    setQuestionIndex((prev) => prev + 1);
  };

  const saveAttempt = async () => {
    const lastCheck = handleNextQuestion(true);
    if (!lastCheck) {
      return Alert.alert('Advertencia', 'Debes completar la ultima pregunta');
    }
    setWaiting(true);
    const body = {
      startTime,
      answers,
      endTime: new Date(),
      lessonId: params.lessonId,
    };
    const res = await Http.instance.post({
      url: `/evaluations/${params.evaluationId}/new-attempt`,
      body,
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    isEndingEvaluationRef.current = true;
    setWaiting(false);
    Alert.alert('Éxito', 'Prueba enviada con éxito', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({ title: params.title });
  }, []);

  useEffect(() => {
    if (params.evaluationId && evaluation) {
      isEndingEvaluationRef.current = false;
      setStartTime(new Date());
      setAnswers(
        evaluation.questions.map((q) => ({
          questionId: q.id,
          questionText: q.title,
          type: q.type,
          options: q.options.map((opt) => {
            if (q.type === QuestionType.MULTIPLE_CHOICE) {
              return { text: opt.text, isChoose: false };
            } else if (q.type === QuestionType.COMPLETE) {
              return { text: '', isChoose: false };
            } else {
              return { text: opt.text, isChoose: false };
            }
          }),
        })),
      );
    }
  }, [evaluation]);

  // handles leaving Screen actions
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        // Prompt the user before leaving the screen
        if (isEndingEvaluationRef.current) {
          navigation.dispatch(e.data.action);
          return;
        }
        Alert.alert(
          'Confirmar acción',
          '¿Desea salir de la prueba, se perderá el progreso?',
          [
            { text: 'No', style: 'cancel' },
            {
              text: 'Salir',
              onPress: () => {
                navigation.dispatch(e.data.action);
              },
            },
          ],
        );
      }),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {evaluation && answers.length > 0 && (
        <ProgressBarTest
          current={questionIndex}
          total={answers.length}
          label={`${questionIndex + 1}/${answers.length}`}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        {/* agregamos un ScrollView a la pantalla para evitar que cuando aparezca el teclado del dispositivo no pueda acceder a todos los campos del formulario */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
        >
          {loading && <Text>cargando...</Text>}
          {!loading && error && <Text>{error.message}</Text>}
          {!loading && !error && evaluation && answers.length > 0 && (
            <QuestionController
              key={answers[questionIndex].questionId}
              index={questionIndex}
              answer={answers[questionIndex]}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomCard}>
        {evaluation && questionIndex < evaluation.questions.length - 1 && (
          <Button
            onClick={() => handleNextQuestion(false)}
            text="Siguiente"
            buttonColor={Colors.primary}
          />
        )}
        {evaluation && questionIndex === evaluation.questions.length - 1 && (
          <Button
            onClick={saveAttempt}
            text="Enviar prueba"
            buttonColor={Colors.accent}
            waiting={waiting}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: 12,
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
  },
});
