// Este código define un componente que muestra un resumen del último intento de evaluación de 
// un estudiante. Calcula y muestra la cantidad de respuestas correctas, incorrectas y el tiempo total 
// del intento. También muestra la calificación del estudiante con un ícono que indica si ha aprobado o no, 
// utilizando un color verde o rojo según corresponda. El diseño está organizado en una fila con la información 
// de la evaluación a la izquierda y la calificación con su respectivo ícono a la derecha.
import { AntDesign } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import DateTime from 'src/libraries/DateTime';
import { UserEvaluation } from 'src/models/UserEvaluation.model';

// Interfaz para tipar los props
interface LastAttemptSummaryProps {
  attempt: UserEvaluation;
}

const LastAttemptSummary: React.FC<LastAttemptSummaryProps> = ({ attempt }) => {
  const correctAnswers = useMemo(
    () =>
      attempt.studentAnswers.reduce(
        (prev, curr) => (curr.isCorrect ? prev + 1 : prev),
        0,
      ),
    [attempt],
  );

  const wrongAnswers = useMemo(
    () =>
      attempt.studentAnswers.reduce(
        (prev, curr) => (!curr.isCorrect ? prev + 1 : prev),
        0,
      ),
    [attempt],
  );

  const time = useMemo(
    () => DateTime.instance.difference(attempt.startTime, attempt.endTime),
    [attempt],
  );

  return (
    <>
      <Text style={styles.title}>Resumen del último intento:</Text>
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Preguntas acertadas: {correctAnswers}
          </Text>
          <Text style={styles.infoText}>
            Preguntas erróneas: {wrongAnswers}
          </Text>
          <Text style={styles.infoText}>Tiempo: {time} segundos</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.gradeText,
              attempt.score >= 14 ? styles.pass : styles.fail,
            ]}
          >
            {attempt.score}/20
          </Text>
          {attempt.score >= 14 ? (
            <AntDesign
              name="checksquareo"
              size={24}
              color={Colors.green} // Ícono verde si la nota es mayor a 14
              style={styles.icon}
              accessibilityLabel="Aprobado"
            />
          ) : (
            <AntDesign
              name="closesquareo"
              size={24}
              color={Colors.red} // Ícono rojo si la nota es menor a 14
              style={styles.icon}
              accessibilityLabel="No aprobado"
            />
          )}
        </View>
      </View>
    </>
  );
};

export default LastAttemptSummary;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: Colors.black,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  pass: {
    color: Colors.green, // Verde si aprueba
  },
  fail: {
    color: Colors.red, // Rojo si falla
  },
  icon: {
    marginHorizontal: 4,
  },
});
