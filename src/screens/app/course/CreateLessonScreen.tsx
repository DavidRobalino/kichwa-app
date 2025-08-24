// Componente CreateLessonScreen que permite crear o actualizar una lección en un curso.
// Los usuarios pueden subir una imagen, ingresar el título y la descripción de la lección, y guardar o publicar la lección según corresponda.
// Se maneja el estado de carga, error y espera mientras se realizan las operaciones con el backend.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import CreateOrUpdateLesson from 'src/components/lesson/create-update/CreateOrUpdateLesson';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useLessonById from 'src/hooks/data/useLessonById';
import { Http } from 'src/libraries/Http';
import { CreateLessonValues } from 'src/models/Lesson.model';
import { CreateLessonScreenRouteProps } from 'src/navigation/navigation.types';

const CreateLessonScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const { params } = useRoute<CreateLessonScreenRouteProps>();
  const [lessonId, setLessonId] = useState(params.lessonId);
  const { lesson, loading, error, mutate } = useLessonById(lessonId);
  const { handleSubmit, control, reset } = useForm<CreateLessonValues>();
  const [waiting, setWaiting] = useState(false);
  const [waitingPublish, setWaitingPublish] = useState(false);

  const handleForm: SubmitHandler<CreateLessonValues> = (data) => {
    console.log('data', data);
    if (lessonId) return updateLesson(lessonId, data);
    return createLesson(data);
  };

  const createLesson = async (data: CreateLessonValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (image) {
      const fileDir = image.split('/').pop();
      const type = image.split('.')[image.split('.').length - 1];
      formData.append('image', {
        uri: image,
        name: `${fileDir}`,
        type: `image/${type}`,
      } as any);
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('courseId', params.courseId.toString());
    formData.append('order', '0');
    const res = await Http.instance.formData({
      url: '/lessons',
      body: formData,
      method: 'POST',
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setLessonId(res.data.id);
    setWaiting(false);
  };

  const updateLesson = async (lessonId: number, data: CreateLessonValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (image) {
      const fileDir = image.split('/').pop();
      const type = image.split('.')[image.split('.').length - 1];
      formData.append('image', {
        uri: image,
        name: `${fileDir}`,
        type: `image/${type}`,
      } as any);
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('courseId', params.courseId.toString());
    const res = await Http.instance.formData({
      url: `/lessons/${lessonId}`,
      body: formData,
      method: 'PUT',
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    reset({ title: data.title, description: data.description });
  };

  const handlePublish = async () => {
    setWaitingPublish(true);
    const currentDraft = lesson?.isDraft || false;
    console.log('currentDraft', currentDraft);
    const isDraft = !currentDraft;
    console.log('isDraft', isDraft);
    const res = await Http.instance.put({
      url: `/lessons/${lessonId}/publish`,
      body: { isDraft },
    });
    if (res.statusCode !== 200) {
      setWaitingPublish(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaitingPublish(false);
    mutate();
    Alert.alert(
      'Éxito',
      isDraft ? 'Lección puesta en borrador' : 'Lección publicada',
    );
  };

  useEffect(() => {
    if (lesson) {
      navigation.setOptions({ title: 'Actualizar lección' });
      reset({ title: lesson.title, description: lesson.description });
    } else {
      navigation.setOptions({ title: 'Crear lección' });
    }
  }, [lesson]);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {lessonId && loading && (
            <View style={GlobalStyles.body}>
              <Text>Cargando...</Text>
            </View>
          )}
          {lessonId && !loading && error && (
            <View style={GlobalStyles.body}>
              <Text>{error.message}</Text>
            </View>
          )}
          {lessonId && !loading && !error && lesson && (
            <CreateOrUpdateLesson
              control={control}
              image={image}
              setImage={setImage}
              lesson={lesson}
              refresh={mutate}
            />
          )}
          {!lessonId && lesson === undefined && (
            <CreateOrUpdateLesson
              control={control}
              image={image}
              setImage={setImage}
              refresh={mutate}
            />
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomCard}>
        <View style={styles.containerBottom}>
          <View style={{ flexShrink: 1, width: '100%' }}>
            {lesson && (
              <Button
                onClick={handlePublish}
                text={lesson.isDraft ? 'Publicar' : 'Borrador'}
                buttonColor={lesson.isDraft ? Colors.accent : Colors.black}
                width="100%"
                waiting={waitingPublish}
                disable={waiting}
              />
            )}
          </View>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              onClick={handleSubmit(handleForm)}
              text="Guardar"
              waiting={waiting}
              disable={waitingPublish}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateLessonScreen;

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
  },
  containerBottom: {
    width: '100%',
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
