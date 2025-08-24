// Componente StudentsListScreen que muestra una lista de estudiantes inscritos en un curso.
// Permite refrescar la lista y maneja estados de carga y error, mostrando un mensaje o imagen en caso de que no haya estudiantes registrados.
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import StudentItem from 'src/components/students-list/StudentItem';
import { Colors } from 'src/constants/Colors';
import useStudentsByCourse from 'src/hooks/data/useStudentsByCourse';
import { User } from 'src/models/User.model';
import {
  LessonsScreenNavigationProps,
  StudentsListScreenRouteProps,
} from 'src/navigation/navigation.types';

const StudentsListScreen = () => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();
  const { params } = useRoute<StudentsListScreenRouteProps>();
  const { error, data, loading, mutate } = useStudentsByCourse(params.courseId);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    mutate();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const renderItem = ({ item }: { item: User }) => (
    <StudentItem
      student={item}
      courseId={params.courseId}
      totalLessons={data?.totalLessons || 0}
    />
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
        data={data?.students || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId.toString()}
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
                <Text>No hay estudiantes ingresados en este curso</Text>
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default StudentsListScreen;

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
