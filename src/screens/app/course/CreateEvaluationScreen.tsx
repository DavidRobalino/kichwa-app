// Este código define una pantalla para crear o editar una evaluación en una lección. 
// La pantalla permite agregar preguntas de distintos tipos (opción múltiple, completar, verdadero o falso)
//  y gestionar su edición o creación mediante un formulario. El formulario se maneja utilizando react-hook-form y
//  los datos de las preguntas se almacenan en un estado que se puede actualizar o enviar a un backend mediante
//  peticiones HTTP. Además, la interfaz incluye botones para añadir preguntas, enviar el formulario o volver atrás.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
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
import CompleteQuestionInput from 'src/components/test/input-questions/CompleteQuestionInput';
import OptionMultipleQuestionInput from 'src/components/test/input-questions/OptionMultipleQuestionInput';
import TrueOrFalseQuestionInput from 'src/components/test/input-questions/TrueOrFalseQuestionInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useEvaluationById from 'src/hooks/data/useEvaluationById';
import { Http } from 'src/libraries/Http';
import { CreateEvaluationValues } from 'src/models/Evaluation.model';
import { QuestionType } from 'src/models/Question.model';
import {
  CreateEvaluationScreenRouteProps,
  CreateLessonNavigationProps,
} from 'src/navigation/navigation.types';

const CreateEvaluationScreen = () => {
  const navigation = useNavigation<CreateLessonNavigationProps>();
  const { params } = useRoute<CreateEvaluationScreenRouteProps>();
  const { control, handleSubmit, reset, setValue } =
    useForm<CreateEvaluationValues>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'questions',
  });
  const [waiting, setWaiting] = useState(false);
  const { evaluation, loading, error, mutate } = useEvaluationById(
    params.lessonId,
    params.evaluationId,
  );

  const handleForm: SubmitHandler<CreateEvaluationValues> = (data) => {
    console.log(data);
    if (params.evaluationId) return updateEvaluation(params.evaluationId, data);
    createEvaluation(data);
  };

  const createEvaluation = async (data: CreateEvaluationValues) => {
    setWaiting(true);
    const res = await Http.instance.post({
      url: `/evaluations`,
      body: { ...data, lessonId: params.lessonId },
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    Alert.alert('Éxito', 'Se creo la evaluación a la lección', [
      {
        text: 'Continuar',
        isPreferred: true,
        style: 'default',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const updateEvaluation = async (id: number, data: CreateEvaluationValues) => {
    setWaiting(true);
    const res = await Http.instance.put({
      url: `/evaluations/${id}`,
      body: { ...data, lessonId: params.lessonId },
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    Alert.alert('Éxito', 'Se actualizo la evaluación', [
      {
        text: 'Continuar',
        isPreferred: true,
        style: 'default',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  useEffect(() => {
    if (params.evaluationId) {
      return navigation.setOptions({ title: 'Editar evaluación' });
    }
    return navigation.setOptions({ title: 'Nueva evaluación' });
  }, []);

  useEffect(() => {
    if (params.evaluationId && evaluation !== undefined) {
      reset({
        questions: evaluation.questions.map((q) => ({
          id: q.id,
          options: q.options,
          title: q.title,
          type: q.type,
        })),
      });
    }
  }, [evaluation]);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled
        >
          {params.evaluationId && loading && <Text>Cargando...</Text>}
          {params.evaluationId && !loading && error && (
            <Text>{error.message}</Text>
          )}
          {params.evaluationId && !loading && !error && evaluation && (
            <View style={GlobalStyles.body}>
              {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  {field.type === QuestionType.MULTIPLE_CHOICE && (
                    <OptionMultipleQuestionInput
                      control={control}
                      index={index + 1}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                    />
                  )}
                  {field.type === QuestionType.COMPLETE && (
                    <CompleteQuestionInput
                      index={index + 1}
                      control={control}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                    />
                  )}
                  {field.type === QuestionType.TRUE_FALSE && (
                    <TrueOrFalseQuestionInput
                      index={index + 1}
                      control={control}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                      setValue={setValue}
                    />
                  )}
                </React.Fragment>
              ))}
              <View>
                <Text style={styles.addTitle}>Agregar pregunta de:</Text>
                <ScrollView horizontal keyboardShouldPersistTaps="always">
                  <View style={styles.containerAddQuestions}>
                    <Button
                      text="Opción multiple"
                      onClick={() =>
                        append({
                          title: '',
                          options: [
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                          ],
                          type: QuestionType.MULTIPLE_CHOICE,
                        })
                      }
                      width="auto"
                    />
                    <Button
                      text="Completar"
                      onClick={() =>
                        append({
                          title: '',
                          options: [{ text: '', isRight: true }],
                          type: QuestionType.COMPLETE,
                        })
                      }
                      width="auto"
                    />
                    <Button
                      text="Verdadero o falso"
                      onClick={() =>
                        append({
                          title: '',
                          options: [
                            { text: 'Falso', isRight: false },
                            { text: 'Verdadero', isRight: false },
                          ],
                          type: QuestionType.TRUE_FALSE,
                        })
                      }
                      width="auto"
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
          {params.evaluationId === undefined && !evaluation && (
            <View style={GlobalStyles.body}>
              {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  {field.type === QuestionType.MULTIPLE_CHOICE && (
                    <OptionMultipleQuestionInput
                      control={control}
                      index={index + 1}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                    />
                  )}
                  {field.type === QuestionType.COMPLETE && (
                    <CompleteQuestionInput
                      index={index + 1}
                      control={control}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                    />
                  )}
                  {field.type === QuestionType.TRUE_FALSE && (
                    <TrueOrFalseQuestionInput
                      index={index + 1}
                      control={control}
                      name={`questions.${index}`}
                      onRemove={() => remove(index)}
                      setValue={setValue}
                    />
                  )}
                </React.Fragment>
              ))}
              <View>
                <Text style={styles.addTitle}>Agregar pregunta de:</Text>
                <ScrollView horizontal keyboardShouldPersistTaps="always">
                  <View style={styles.containerAddQuestions}>
                    <Button
                      text="Opción multiple"
                      onClick={() =>
                        append({
                          title: '',
                          options: [
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                            { text: '', isRight: false },
                          ],
                          type: QuestionType.MULTIPLE_CHOICE,
                        })
                      }
                      width="auto"
                    />
                    <Button
                      text="Completar"
                      onClick={() =>
                        append({
                          title: '',
                          options: [{ text: '', isRight: true }],
                          type: QuestionType.COMPLETE,
                        })
                      }
                      width="auto"
                    />
                    <Button
                      text="Verdadero o falso"
                      onClick={() =>
                        append({
                          title: '',
                          options: [
                            { text: 'Falso', isRight: false },
                            { text: 'Verdadero', isRight: true },
                          ],
                          type: QuestionType.TRUE_FALSE,
                        })
                      }
                      width="auto"
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
        <View style={styles.bottomCard}>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              onClick={() => navigation.goBack()}
              text="Volver"
              buttonColor={Colors.white}
              textColor={Colors.black}
              borderColor={Colors.gray}
              width={125}
            />
          </View>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              onClick={handleSubmit(handleForm)}
              text={params.evaluationId ? 'Actualizar' : 'Crear evaluación'}
              buttonColor={Colors.accent}
              waiting={waiting}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEvaluationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
  addTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  containerAddQuestions: {
    flexDirection: 'row',
    columnGap: 12,
    rowGap: 6,
    flexWrap: 'wrap',
  },
});
