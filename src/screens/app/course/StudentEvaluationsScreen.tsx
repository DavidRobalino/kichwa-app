// Componente StudentEvaluationsScreen que muestra una lista de evaluaciones de un estudiante en un curso.
// Permite refrescar la lista de evaluaciones, maneja estados de carga y error, y muestra un mensaje o imagen si no hay evaluaciones registradas.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import StudentEvaluationItem from 'src/components/students-list/StudentEvaluationItem';
import { Colors } from 'src/constants/Colors';
import useEvaluationsByStudent from 'src/hooks/data/useEvaluationsByStudent';
import { StudentEvaluation } from 'src/models/StudentEvaluation.model';
import {
  LessonsScreenNavigationProps,
  StudentEvaluationsScreenRouteProps,
} from 'src/navigation/navigation.types';

const StudentEvaluationsScreen = () => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();
  const { params } = useRoute<StudentEvaluationsScreenRouteProps>();
  const { error, studentEvaluations, loading, mutate } =
    useEvaluationsByStudent(params.courseId, params.userId);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    mutate();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const renderItem = ({ item }: { item: StudentEvaluation }) => (
    <StudentEvaluationItem studentEvaluation={item} />
  );

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
      <FlatList
        refreshing={refresh}
        onRefresh={onRefresh}
        data={studentEvaluations}
        renderItem={renderItem}
        keyExtractor={(item) => item.evaluationId.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <>
            {loading && <Text>cargando...</Text>}
            {!loading && error && <Text>{error.message}</Text>}
            {!loading && !error && (
              <View style={styles.containerEmpty}>
                <Image
                  source={require('../../../../assets/empty-folder.png')}
                  style={{ height: 128, width: 128 }}
                />
                <Text>
                  El estudiante no ha dado ninguna evaluación de momento.
                </Text>
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default StudentEvaluationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  flatListContainer: {
    paddingBottom: 80, // Espacio adicional para que el contenido no se superponga con el FAB
    paddingHorizontal: 12,
  },
  containerEmpty: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
