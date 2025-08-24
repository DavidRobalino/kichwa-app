// Este componente CardCourse muestra una tarjeta con la información de un curso, incluyendo una imagen, 
// el nombre del curso y el nombre del instructor. Al presionar la tarjeta, navega a la pantalla de lecciones 
// del curso. Si se realiza una pulsación prolongada y el usuario tiene permisos de edición, se abre un modal 
// para editar el curso. El modal se maneja mediante el estado isOpenModal y se cierra al actualizar la 
// información del curso. La apariencia de la tarjeta se personaliza con estilos como bordes redondeados,
//  sombras y disposición de imagen y texto.
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Course } from 'src/models/Course.model';
import { ScreensNames } from 'src/navigation/constants';
import { LessonsScreenNavigationProps } from 'src/navigation/navigation.types';
import { PictureUtils } from 'src/utils/Picture.util';
import CreateCourseModal from './modals/CreateCourseModal';

interface CardCourseProps {
  course: Course;
  refresh: () => void;
  canEdit?: boolean;
}

const CardCourse: React.FC<CardCourseProps> = ({
  course,
  refresh,
  canEdit = false,
}) => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handlePress = () => {
    navigation.navigate(ScreensNames.app.lessons as 'lessons', {
      courseId: course.id,
      courseName: course.name,
      isTeacher: canEdit,
      courseCode: course.courseCode,
    });
  };

  const onLongPress = useCallback(() => {
    if (!canEdit) return undefined;
    return setIsOpenModal(true);
  }, [canEdit]);

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={handlePress}
        onLongPress={onLongPress}
        android_ripple={{ color: '' }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: PictureUtils.getAbsoluteUrl(course.picture) }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.courseTitle}>{course.name}</Text>
          <Text style={styles.instructor}>{course.teacherName || 'n/a'}</Text>
        </View>
      </Pressable>
      <CreateCourseModal
        course={course}
        isOpen={isOpenModal}
        refresh={refresh}
        close={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default CardCourse;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Coloca la imagen y el texto en una fila
    // width: '100%', // Ancho de la tarjeta
    height: 120, // Altura fija para la tarjeta
    borderRadius: 10, // Bordes redondeados
    backgroundColor: '#fff', // Fondo blanco
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 2, // Elevación para sombra en Android
    // marginHorizontal: '5%', // Espaciado horizontal
    marginVertical: 10, // Espaciado vertical
  },
  imageContainer: {
    flex: 1, // Ocupa la mitad del ancho de la tarjeta
  },
  image: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    borderTopLeftRadius: 10, // Bordes redondeados en la parte superior izquierda
    borderBottomLeftRadius: 10, // Bordes redondeados en la parte inferior izquierda
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1, // Ocupa la otra mitad del ancho de la tarjeta
    justifyContent: 'center', // Centra verticalmente el texto
    padding: 10, // Espaciado interno
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Espacio entre el título y el instructor
    textAlign: 'center',
  },
  instructor: {
    fontSize: 14,
    color: '#555', // Color del texto del instructor
    textAlign: 'center',
  },
});
