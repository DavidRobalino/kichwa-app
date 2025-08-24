// Este código define un componente 'WeeklyLogs' que muestra un gráfico de barras con los registros semanales de un estudiante, 
// utilizando los datos obtenidos a través del hook 'useStudentWeeklyLogs'. Los días de la semana son representados en el eje horizontal, 
// y el número de registros correspondientes a cada día se muestra en el eje vertical. El gráfico se muestra solo después de que los datos se 
// hayan cargado correctamente. Si los datos están cargando, muestra un mensaje de carga, y si ocurre un error, muestra el mensaje de error. 
// El gráfico tiene un estilo personalizado con barras de color azul y etiquetas rotadas. Además, el gráfico es interactivo y se puede desplazar horizontalmente.
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import { Colors } from 'src/constants/Colors';
import useStudentWeeklyLogs from 'src/hooks/data/useStudentWeeklyLogs';

const screenWidth = Dimensions.get('window').width;

const WeeklyLogs = () => {
  const { studentWeeklyLogs, loading, error, mutate } = useStudentWeeklyLogs();

  const data = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
      {
        data: studentWeeklyLogs
          ? [
              studentWeeklyLogs.mondayCount,
              studentWeeklyLogs.tuesdayCount,
              studentWeeklyLogs.wednesdayCount,
              studentWeeklyLogs.thursdayCount,
              studentWeeklyLogs.fridayCount,
              studentWeeklyLogs.saturdayCount,
              studentWeeklyLogs.sundayCount,
            ]
          : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.white,
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    decimalPlaces: 0, // Cantidad de decimales
    color: (opacity = 1) => `rgba(32, 72, 254, ${opacity})`, // Color de las barras
    labelColor: (opacity = 1) => `rgba(32, 72, 254, ${opacity})`, // Color del texto de los labels
  };

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <View style={styles.reportsContainer}>
      <Text style={styles.title}>Registro semanal</Text>
      {loading && <Text>Cargando...</Text>}
      {!loading && error && <Text>{error.message}</Text>}
      {!loading && !error && (
        <ScrollView horizontal={true}>
          <BarChart
            style={styles.graphStyle}
            data={data}
            width={screenWidth * 1.2} // Ajusta el ancho del gráfico a la pantalla menos padding
            height={260}
            fromZero={true}
            showValuesOnTopOfBars={true}
            //fromNumber={10}
            //segments={10}
            showBarTops={true}
            withHorizontalLabels={false}
            withVerticalLabels={true}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </ScrollView>
      )}
    </View>
  );
};

export default WeeklyLogs;

const styles = StyleSheet.create({
  reportsContainer: {
    backgroundColor: Colors.white, // Cambia a blanco para ver mejor la sombra
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 0,
  },
  graphStyle: {
    borderRadius: 16,
    paddingRight: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
  },
});
