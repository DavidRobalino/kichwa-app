// Este código define un componente 'StatisticsTabs' que permite alternar entre dos pestañas: "Estudiantes" y "Reportes". 
// Dependiendo de la pestaña seleccionada, se muestra el componente correspondiente, 'StudentsNotes' o 'StudentsReport', 
// que reciben datos relacionados con los estudiantes y las evaluaciones del curso, respectivamente. 
// La navegación entre las pestañas se realiza mediante botones que cambian de estilo cuando están activos, 
// y los datos se pasan a los componentes correspondientes según la pestaña seleccionada.
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import { StatisticsCourse } from 'src/models/StatisticsCourse.model';
import StudentsNotes from './tabs/StudentsNotes';
import StudentsReport from './tabs/StudentsReport';

interface IStatisticsTabsProps {
  data: StatisticsCourse;
}

const StatisticsTabs = ({ data }: IStatisticsTabsProps) => {
  const [tab, setTab] = useState<'students' | 'evaluation'>('students');

  return (
    <View>
      <View style={styles.cardContainer}>
        <Pressable
          style={[styles.button, tab === 'students' && styles.activeButton]}
          onPress={() => setTab('students')}
          android_ripple={{ color: '' }}
        >
          <Text
            style={[
              styles.buttonText,
              tab === 'students' && styles.activeButtonText,
            ]}
          >
            Estudiantes
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, tab === 'evaluation' && styles.activeButton]}
          onPress={() => setTab('evaluation')}
          android_ripple={{ color: '' }}
        >
          <Text
            style={[
              styles.buttonText,
              tab === 'evaluation' && styles.activeButtonText,
            ]}
          >
            Reportes
          </Text>
        </Pressable>
      </View>
      {tab === 'students' && (
        <StudentsNotes joinedStudents={data.joinedStudents} />
      )}
      {tab === 'evaluation' && (
        <StudentsReport
          answersHitsFailures={data.answersHitsFailures}
          evaluationScores={data.evaluationScores}
        />
      )}
    </View>
  );
};

export default StatisticsTabs;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 6,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  activeButtonText: {
    color: Colors.white,
  },
});
