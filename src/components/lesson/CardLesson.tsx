// Este componente CardLesson muestra la información de una lección en una tarjeta, permitiendo 
// interacciones como redirigir al usuario al hacer clic, editar o eliminar la lección 
// (si el usuario es profesor). También muestra el puntaje de la lección y una imagen representativa.
//  La tarjeta puede estar bloqueada, lo que impide que el usuario interactúe con ella.
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Colors } from 'src/constants/Colors';
import { Http } from 'src/libraries/Http';
import { Lesson } from 'src/models/Lesson.model';
import { ScreensNames } from 'src/navigation/constants';
import { LessonsScreenNavigationProps } from 'src/navigation/navigation.types';
import { PictureUtils } from 'src/utils/Picture.util';

// Define los props para el componente
interface CardLessonProps {
  lesson: Lesson;
  onClick: () => void; // Función de redirección
  isLock: boolean; // Prop para habilitar/deshabilitar el clic
  index: number;
  isTeacher?: boolean;
  refresh: () => void;
}

const CardLesson: React.FC<CardLessonProps> = ({
  lesson,
  onClick,
  isLock,
  index,
  isTeacher,
  refresh,
}) => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();

  const score = useMemo(() => {
    if (lesson.evaluations?.length === 0) return 0;
    if (!lesson.evaluations[0].userEvaluations) return 0;
    if (lesson.evaluations[0].userEvaluations.length === 0) return 0;
    return lesson.evaluations[0].userEvaluations[0].score;
  }, [lesson]);

  // función que ejecuta la redirección solo si isClickable es true
  const handleOnClick = () => {
    if (isLock) return;
    onClick();
  };

  const handleRemove = async () => {
    Alert.alert(
      'Aviso',
      '¿Estas seguro de eliminar este nivel, esta acción es irreversible?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          isPreferred: true,
          style: 'destructive',
          text: 'Eliminar',
          onPress: removeLesson,
        },
      ],
    );
  };

  const removeLesson = async () => {
    const res = await Http.instance.delete({ url: `/lessons/${lesson.id}` });
    if (res.statusCode !== 200) {
      return Alert.alert('Error', res.message + '');
    }
    Alert.alert('Éxito', 'Se elimino la lección');
    refresh();
  };

  return (
    <Pressable
      onPress={handleOnClick}
      disabled={isLock}
      android_ripple={{ color: '', foreground: true }}
    >
      <View style={[styles.container, isLock ? {} : { elevation: 2 }]}>
        {isLock && (
          <View style={styles.lockOverlay}>
            <View style={styles.containerLock}>
              <View style={styles.shadowLock}>
                <AntDesign name="lock" size={30} color={Colors.white} />
                <Text style={[styles.iconText, { color: Colors.white }]}>
                  Bloqueado
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Título Nivel 1 a la izquierda */}
          <Text style={styles.levelTitle}>
            <Text>Nivel </Text>
            <Text>{index + 1}</Text>
          </Text>
          {isTeacher && (
            <Menu>
              <MenuTrigger>
                <View>
                  <Entypo
                    name="dots-three-vertical"
                    size={20}
                    color={Colors.grayDark}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions customStyles={{ optionsContainer: { width: 100 } }}>
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(
                      ScreensNames.app.createLesson as 'create-lesson',
                      { lessonId: lesson.id, courseId: lesson.courseId },
                    )
                  }
                  style={styles.menuOption}
                >
                  <Text style={styles.menuText}>Editar</Text>
                </MenuOption>
                <View style={styles.divider} />
                <MenuOption onSelect={handleRemove} style={styles.menuOption}>
                  <Text style={[styles.menuText, { color: Colors.red }]}>
                    Eliminar
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
        </View>
        {/* Título centrado en el cuadro */}
        <Text style={styles.courseTitle}>
          {lesson.title}{' '}
          {isTeacher && (
            <Text style={{ fontSize: 12, color: Colors.red }}>
              {lesson.isDraft ? '(Borrador)' : ''}
            </Text>
          )}
        </Text>
        {/* Icono pequeño y texto 14/20 */}
        <View style={styles.iconTextContainer}>
          <AntDesign name="filetext1" size={16} color={Colors.blackTitle} />
          <Text style={styles.iconText}>{score}/20</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {/* Imagen redonda */}
          <Image
            source={{ uri: PictureUtils.getAbsoluteUrl(lesson.picture) }}
            style={styles.roundImage}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default CardLesson;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  lockOverlay: {
    borderRadius: 5,
    backgroundColor: Colors.black + '66',
    // borderWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 1,
  },
  containerLock: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowLock: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black + '99',
    borderRadius: 100,
    padding: 8,
    height: 90,
    width: 90,
  },
  levelTitle: {
    fontSize: 18,
    color: Colors.blackTitle,
    fontWeight: '700',
    marginBottom: 6, // Espacio entre el título y el cuadro
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left', // Centra el título dentro del cuadro
    marginBottom: 10, // Espacio entre el título y el ícono
    // lineHeight: 22, // Altura de línea para ajustar la altura del texto si es largo
  },
  iconTextContainer: {
    flexDirection: 'row', // Coloca el ícono y el texto en una fila
    alignItems: 'center', // Alinea verticalmente
    justifyContent: 'center',
    marginBottom: 8, // Espacio debajo del texto 14/20
    columnGap: 8,
  },
  iconText: {
    fontSize: 14,
  },
  roundImage: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen para mantener la redondez
    borderRadius: 50, // Hace la imagen redonda
    resizeMode: 'contain', // Ajusta la imagen dentro del cuadro
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  // menu
  menuOption: {
    padding: 8,
  },
  menuText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
