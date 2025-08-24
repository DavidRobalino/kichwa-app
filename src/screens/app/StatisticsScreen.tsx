// Componente de pantalla de estadísticas que permite a los usuarios seleccionar una lección de un curso 
// y visualizar datos estadísticos relacionados. 
// Utiliza un Picker para elegir la lección, y recupera los datos mediante hooks personalizados. 
// Muestra mensajes de carga y error según el estado de la solicitud. 
// También usa react-navigation para establecer dinámicamente el título de la pantalla.
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import StatisticsTabs from 'src/components/statistics/StatisticsTabs';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useCourseStatisticsByLesson from 'src/hooks/data/useCourseStatisticsByLesson';
import useLessonsByCourse from 'src/hooks/data/useLessonsByCourse';
import {
  LessonsScreenNavigationProps,
  StatisticsScreenRouteProps,
} from 'src/navigation/navigation.types';

const StatisticsScreen = () => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();
  const { params } = useRoute<StatisticsScreenRouteProps>();
  const [lessonSelected, setLessonSelected] = useState<number>();
  const { lessons } = useLessonsByCourse(params.courseId);
  const { data, loading, error, mutate } =
    useCourseStatisticsByLesson(lessonSelected);

  useEffect(() => {
    navigation.setOptions({ title: params.title });
  }, []);

  useEffect(() => {
    mutate();
  }, [lessonSelected]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={GlobalStyles.body}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.lessonText}>Lección</Text>
              {/* Wrapper para aplicar estilo al Picker */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={lessonSelected}
                  onValueChange={(value) =>
                    setLessonSelected(Number(value) || undefined)
                  }
                  style={styles.picker}
                  mode={Platform.OS === 'android' ? 'dropdown' : undefined} // Usamos 'dropdown' o 'dialog' solo en Android
                >
                  <Picker.Item label="Escoger lección" value="0" />
                  {lessons.map((lesson) => (
                    <Picker.Item
                      key={lesson.id}
                      label={lesson.title}
                      value={lesson.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          {lessonSelected && loading && <Text>cargando...</Text>}
          {!loading && error && <Text>{error.message}</Text>}
          {!loading && !error && data && <StatisticsTabs data={data} />}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 16,
    padding: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    columnGap: 16,
  },
  lessonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '100%',
    flexShrink: 1,
  },
  picker: {
    width: '100%',
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
