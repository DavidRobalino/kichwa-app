// Este código define un componente 'StudentEvaluationItem' que muestra información sobre una evaluación de un estudiante, como el título de la evaluación, el número de intentos realizados y la nota máxima posible. 
// Además, muestra un enlace para ver el último intento realizado por el estudiante. 
// Al presionar el enlace, el componente navega a la pantalla de retroalimentación ('feedback-test') pasando el 'evaluationId' y 'userEvaluationId' para mostrar los detalles del último intento.
// Se utiliza el hook 'useNavigation' de React Navigation para manejar la navegación entre pantallas.
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import { StudentEvaluation } from 'src/models/StudentEvaluation.model';
import { ScreensNames } from 'src/navigation/constants';
import { LessonsScreenNavigationProps } from 'src/navigation/navigation.types';

interface IStudentEvaluationItemProps {
  studentEvaluation: StudentEvaluation;
}

const StudentEvaluationItem = ({
  studentEvaluation,
}: IStudentEvaluationItemProps) => {
  const navigation = useNavigation<LessonsScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{studentEvaluation.title}</Text>
      <View style={styles.containerInfo}>
        <Text style={styles.textInfo}>
          <Text>Intentos: </Text>
          <Text>{studentEvaluation.attempts}</Text>
        </Text>
        <Text style={styles.textInfo}>
          <Text>Nota máxima: </Text>
          <Text>{studentEvaluation.maxScore}/20</Text>
        </Text>
      </View>
      <Text
        style={styles.textLastAttempt}
        onPress={() =>
          navigation.navigate(
            ScreensNames.app.feedbackTest as 'feedback-test',
            {
              evaluationId: studentEvaluation.evaluationId,
              title: `Evaluación: ${studentEvaluation.title}`,
              userEvaluationId: studentEvaluation.lastAttemptId,
            },
          )
        }
      >
        Ver ultimo intento
      </Text>
    </View>
  );
};

export default StudentEvaluationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    color: Colors.blackTitle,
  },
  containerInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 8,
    marginBottom: 8,
  },
  textInfo: {
    fontSize: 16,
    color: Colors.black,
  },
  textLastAttempt: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: Colors.blackTitle,
    textAlign: 'right',
  },
});
