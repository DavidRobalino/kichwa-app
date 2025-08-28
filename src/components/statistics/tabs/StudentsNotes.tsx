// Este código define un componente 'StudentsNotes' que recibe una lista de estudiantes y muestra sus nombres y calificaciones en una tabla.
// La tabla tiene una fila para cada estudiante, donde se muestra su nombre completo y la calificación obtenida (de 20 puntos).
// Las filas alternan su color de fondo para una mejor legibilidad, y la calificación se colorea de rojo si es menor a 14 y verde si es mayor o igual a 14.
// Además, se incluye un encabezado con los títulos "Estudiante" y "Nota" en la parte superior de la tabla.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import { IJoinedStudentNote } from 'src/models/StatisticsCourse.model';

interface IStudentsNotesProps {
  joinedStudents: IJoinedStudentNote[];
}

const StudentsNotes = ({ joinedStudents }: IStudentsNotesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de estudiantes</Text>
      </View>
      <View style={styles.columnHeader}>
        <Text style={styles.columnText}>Estudiante</Text>
        <Text style={styles.columnText}>Nota</Text>
      </View>
      {joinedStudents.map((student, index) => (
        <View
          key={student.userId}
          style={[
            styles.row,
            {
              backgroundColor:
                index % 2 === 0 ? Colors.grayLight : Colors.white,
            },
          ]}
        >
          <Text
            style={styles.studentText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {index + 1}. {student.firstName} {student.lastName}
          </Text>
          <Text
            style={[
              styles.gradeText,
              {
                color: student.highestScore
                  ? student.highestScore < 14
                    ? Colors.red
                    : Colors.green
                  : Colors.black,
              },
            ]}
          >
            {student.highestScore}/20
          </Text>
        </View>
      ))}
    </View>
  );
};

export default StudentsNotes;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  columnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  studentText: {
    fontSize: 16,
    maxWidth: '80%',
  },
  gradeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
