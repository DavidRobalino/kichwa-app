// Este código define un componente 'StudentItem' que muestra información detallada sobre un estudiante en un curso. 
// Muestra el nombre, correo electrónico y avatar del estudiante, además de estadísticas sobre sus interacciones, como el número de lecciones vistas, evaluaciones completadas, contenidos consultados y recursos descargados. 
// También muestra el progreso del estudiante en el curso mediante una barra de progreso que refleja la cantidad de evaluaciones completadas en relación al total de lecciones del curso. 
// Al final, incluye un botón que permite navegar a una pantalla de "Evaluaciones del estudiante", pasando el 'courseId' y 'userId' para ver más detalles.
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { Colors } from 'src/constants/Colors';
import { User } from 'src/models/User.model';
import { ActionType } from 'src/models/UserInteraction.model';
import { ScreensNames } from 'src/navigation/constants';
import { LessonsScreenNavigationProps } from 'src/navigation/navigation.types';
import { PictureUtils } from 'src/utils/Picture.util';
import Button from '../common/button/Button';

interface IStudentItemProps {
  student: User;
  courseId: number;
  totalLessons: number;
}

const StudentItem = ({
  student,
  courseId,
  totalLessons,
}: IStudentItemProps) => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();

  const name = useMemo(
    () => `${student.firstName} ${student.lastName}`,
    [student],
  );

  const countLessons = useMemo(
    () =>
      student.userInteractions.filter(
        (ui) => ui.type === ActionType.VIEW_LESSON,
      ).length,
    [student],
  );

  const countEvaluations = useMemo(
    () =>
      student.userInteractions.filter(
        (ui) => ui.type === ActionType.COMPLETE_EVALUATION,
      ).length,
    [student],
  );

  const countGlossaries = useMemo(
    () =>
      student.userInteractions.filter(
        (ui) => ui.type === ActionType.VIEW_GLOSSARY,
      ).length,
    [student],
  );

  const countResources = useMemo(
    () =>
      student.userInteractions.filter(
        (ui) => ui.type === ActionType.DOWNLOAD_RESOURCE,
      ).length,
    [student],
  );

  const courseAverage = useMemo(() => 0, [student]);

  const progress = useMemo(
    () => countEvaluations / totalLessons,
    [countEvaluations, totalLessons],
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View>
          <Image
            source={{
              uri: PictureUtils.getAbsoluteUrl(
                student.avatar ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
              ),
            }}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textEmail}>{student.account?.email}</Text>
        </View>
      </View>
      <Text style={styles.titleSection}>Interacciones del estudiante</Text>
      <View style={styles.containerStats}>
        <View>
          <Text style={styles.infoText}>
            <Text>{countLessons} </Text>
            <Text style={{ fontWeight: '600' }}>lecciones</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            <Text>{countEvaluations} </Text>
            <Text style={{ fontWeight: '600' }}>evaluaciones</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            <Text>{countGlossaries} </Text>
            <Text style={{ fontWeight: '600' }}>contenidos</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            <Text>{countResources} </Text>
            <Text style={{ fontWeight: '600' }}>recursos descargados</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.titleSection}>Progreso del curso</Text>
      <View style={styles.containerProgress}>
        <Text style={styles.textProgress}>
          <Text>{countEvaluations}</Text>
          <Text>/{totalLessons}</Text>
        </Text>
        <Progress.Bar
          borderRadius={5}
          color={Colors.green}
          borderColor={Colors.green}
          progress={progress}
          width={null}
          height={20}
        />
      </View>
      {/* <Text style={styles.textAverage}>
        <Text>Promedio: </Text>
        <Text>{courseAverage}/20</Text>
      </Text> */}
      <View style={{ height: 12 }} />
      <Button
        text="Ver evaluaciones"
        buttonColor={Colors.accent}
        onClick={() =>
          navigation.navigate(
            ScreensNames.app.studentEvaluations as 'student-evaluations',
            {
              courseId,
              title: `Evaluaciones de ${name}`,
              userId: student.userId,
            },
          )
        }
      />
    </View>
  );
};

export default StudentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  containerHeader: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blackTitle,
  },
  textEmail: {
    fontSize: 14,
    color: Colors.grayDark,
  },
  titleSection: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.blackTitle,
    marginVertical: 8,
  },
  containerStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 8,
  },
  infoText: {
    fontSize: 16,
    color: Colors.black,
  },
  containerProgress: {
    width: '100%',
  },
  textProgress: {
    textAlign: 'right',
    fontSize: 16,
    color: Colors.black,
  },
  textAverage: {
    marginVertical: 12,
    fontSize: 16,
    textAlign: 'right',
    color: Colors.blackTitle,
  },
});
