// Pantalla de lecciones dentro de un curso en una aplicación móvil. Muestra una lista de
//  lecciones, permitiendo a los profesores gestionar el contenido (ordenar lecciones, crear nuevas)
// y a los estudiantes acceder a ellas según su disponibilidad. También incluye opciones adicionales
// como ver estadísticas, lista de estudiantes y copiar el código del curso.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FloatingActionButton from 'src/components/common/button/FloatingActionButton';
import CardLesson from 'src/components/lesson/CardLesson';
import SortableLessonsModal from 'src/components/lesson/modals/SortableLessonsModal';
import TextCourse from 'src/components/lesson/TextCourse';
import { Colors } from 'src/constants/Colors';
import useLessonsByCourse from 'src/hooks/data/useLessonsByCourse';
import { Lesson } from 'src/models/Lesson.model';
import { ScreensNames } from 'src/navigation/constants';
import {
  LessonsScreenNavigationProps,
  LessonsScreenRouteProps,
} from 'src/navigation/navigation.types';

const LessonsScreen = () => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();
  const { params } = useRoute<LessonsScreenRouteProps>();
  const { lessons, error, loading, mutate } = useLessonsByCourse(
    params.courseId,
  );
  const [refresh, setRefresh] = useState(false);

  const actions = useMemo(
    () => [
      {
        label: 'Ver estadísticas',
        src: require('../../../assets/floatingActionButtons/estadisticas.png'),
        onPress: () =>
          navigation.navigate(ScreensNames.app.statistics as 'statistics', {
            courseId: params.courseId,
            title: `Estadísticas ${params.courseName}`,
          }),
      },
      {
        label: 'Ver estudiantes',
        src: require('../../../assets/floatingActionButtons/prueba.png'),
        onPress: () =>
          navigation.navigate(
            ScreensNames.app.studentsList as 'students-list',
            {
              courseId: params.courseId,
              title: `Estudiantes ${params.courseName}`,
            },
          ),
      },
      {
        label: 'Crear lección',
        src: require('../../../assets/floatingActionButtons/students.png'),
        onPress: () =>
          navigation.navigate(
            ScreensNames.app.createLesson as 'create-lesson',
            { courseId: params.courseId },
          ),
      },
      {
        label: 'Copiar código curso',
        src: require('../../../assets/floatingActionButtons/students.png'),
        onPress: async () => {
          await Clipboard.setStringAsync(params.courseCode);
          Alert.alert(
            'Éxito',
            'Se ha copiado el código del curso al portapapeles',
          );
        },
      },
    ],
    [],
  );

  const onRefresh = () => {
    setRefresh(true);
    mutate();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const renderItem = ({ item, index }: { item: Lesson; index: number }) => (
    <View style={styles.cardContainer}>
      <CardLesson
        onClick={() =>
          navigation.navigate(ScreensNames.app.lesson as 'lesson', {
            lessonId: item.id,
            lessonName: item.title,
          })
        }
        isLock={
          params.isTeacher
            ? false
            : index === 0
            ? false
            : !lessons[index].isUnlocked
        }
        isTeacher={params.isTeacher}
        lesson={item}
        index={index}
        refresh={mutate}
      />
    </View>
  );

  useEffect(() => {
    navigation.setOptions({ title: params.courseName });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <View style={{ marginTop: 12 }}>
            <TextCourse leftText="Lecciones" rightText={lessons.length + ''} />
            {params.isTeacher && lessons.length > 1 && (
              <SortableLessonsModal
                courseId={params.courseId}
                lessons={lessons}
                refresh={mutate}
              />
            )}
          </View>
        }
        refreshing={refresh}
        onRefresh={onRefresh}
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Define el número de columnas por fila
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <>
            {loading && <Text>cargando...</Text>}
            {!loading && error && <Text>{error.message}</Text>}
            {!loading && !error && (
              <View style={styles.containerEmpty}>
                <Image
                  source={require('../../../assets/empty-folder.png')}
                  style={{ height: 128, width: 128 }}
                />
                <Text>No hay lecciones creadas en el curso</Text>
              </View>
            )}
          </>
        }
      />
      {params.isTeacher && (
        <View style={styles.buttonContainer}>
          <FloatingActionButton actions={actions} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LessonsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  flatListContainer: {
    paddingBottom: 80, // Espacio adicional para que el contenido no se superponga con el FAB
    paddingHorizontal: 12,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    alignItems: 'center',
  },
  containerEmpty: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
