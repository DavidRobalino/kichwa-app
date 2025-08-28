// Componente HomeScreen que muestra una lista de cursos en la pantalla principal. 
// Permite a los usuarios refrescar la lista y, si tienen rol de "TEACHER", crear nuevos cursos. 
// Usa `useMyCourses` para obtener los cursos, `useProfile` para la información del usuario 
// y `useFocusEffect` para actualizar los datos al entrar en la pantalla. 
// Además, maneja un botón flotante para agregar cursos y un modal para su creación.
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FloatingActionButton from 'src/components/common/button/FloatingActionButton';
import CardCourse from 'src/components/home/CardCourse';
import CreateCourseModal from 'src/components/home/modals/CreateCourseModal';
import TextCourse from 'src/components/lesson/TextCourse';
import { Colors } from 'src/constants/Colors';
import useMyCourses from 'src/hooks/data/useMyCourses';
import useProfile from 'src/hooks/data/useProfile';
import { Course } from 'src/models/Course.model';
import { InteractionUtils } from 'src/utils/Interaction.util';

const HomeScreen = () => {
  const { me } = useProfile();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { courses, error, loading, mutate } = useMyCourses();
  const [refresh, setRefresh] = useState(false);

  const actions = useMemo(
    () => [
      {
        label: 'Crear curso',
        src: require('../../../assets/floatingActionButtons/presentacion.png'),
        onPress: () => setIsOpenModal(true),
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

  const renderItem = ({ item }: { item: Course }) => (
    <CardCourse
      course={item}
      refresh={mutate}
      canEdit={Number(me.userId) === Number(item.teacherId)}
    />
  );

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  useEffect(() => {
    const tout = setTimeout(() => {
      InteractionUtils.registerDailyLog();
    }, InteractionUtils.MIN_TIMEOUT_TIME);

    return () => {
      if (tout) clearTimeout(tout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <View style={{ paddingTop: 12 }}>
            <TextCourse leftText="Lista de cursos" rightText="" />
          </View>
        }
        refreshing={refresh}
        onRefresh={onRefresh}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
                <Text>No hay cursos que mostrar</Text>
              </View>
            )}
          </>
        }
      />
      {me.roles.includes('TEACHER') && (
        <>
          <View style={styles.buttonContainer}>
            <FloatingActionButton actions={actions} />
          </View>
          <CreateCourseModal
            isOpen={isOpenModal}
            refresh={mutate}
            close={() => setIsOpenModal(false)}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  flatListContainer: {
    paddingBottom: 80, // Espacio adicional para que el contenido no se superponga con el FAB
    paddingHorizontal: 12,
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
