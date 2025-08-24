// Este código define un componente 'StudentsReport' que muestra dos tipos de gráficos para representar estadísticas de estudiantes:
// 1. Un gráfico de barras apiladas que muestra la cantidad de aciertos y fallos por pregunta. También muestra cuál fue la pregunta con más aciertos y la que tuvo más fallos.
// 2. Un gráfico circular (pie chart) que muestra el porcentaje de estudiantes aprobados, reprobados y ausentes, basado en las calificaciones obtenidas en la evaluación.
// Ambos gráficos usan datos pasados como propiedades: 'evaluationScores' para las calificaciones y 'answersHitsFailures' para los aciertos y fallos por pregunta.
// Se utilizan componentes de 'react-native-chart-kit' para mostrar los gráficos y se optimizan con 'useMemo' para calcular los valores de forma eficiente.
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import TextCourse from 'src/components/lesson/TextCourse';
import { Colors } from 'src/constants/Colors';
import {
  IAnswerHitAndFail,
  IEvaluationScore,
} from 'src/models/StatisticsCourse.model';

const chartConfig = {
  backgroundColor: Colors.white,
  backgroundGradientFrom: Colors.white,
  backgroundGradientTo: Colors.white,
  barPercentage: 1,
  color: (opacity = 1) => `rgba(32, 72, 254, ${opacity})`,
  labelColor: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
};

const screenWidth = Dimensions.get('window').width;

interface IStudentsReportProps {
  evaluationScores: IEvaluationScore;
  answersHitsFailures: IAnswerHitAndFail[];
}

const StudentsReport = ({
  answersHitsFailures,
  evaluationScores,
}: IStudentsReportProps) => {
  return (
    <>
      <ReportsComponentPieChart evaluationScores={evaluationScores} />
      <ReportsComponentStackedBar answersHitsFailures={answersHitsFailures} />
    </>
  );
};

export default StudentsReport;

const ReportsComponentStackedBar = ({
  answersHitsFailures,
}: Pick<IStudentsReportProps, 'answersHitsFailures'>) => {
  const dataStackedBar = useMemo(() => {
    const labels: string[] = [];
    const data: Array<[number, number]> = [];
    answersHitsFailures.forEach((answers, index) => {
      labels.push(`P${index + 1}`);
      data.push([Number(answers.hits), Number(answers.failures)]);
    });
    return {
      data,
      labels,
      legend: ['Aciertos', 'Fallos'],
      barColors: [Colors.greenLight, Colors.redLight],
    };
  }, [answersHitsFailures]);

  const info = useMemo(() => {
    if (answersHitsFailures.length === 0) {
      return { mostHit: '--', mostFailure: '--' };
    }

    let mostHitIndex = 0;
    let mostFailIndex = 0;

    answersHitsFailures.forEach((answer, index, arr) => {
      if (answer.hits > arr[mostHitIndex].hits) {
        mostHitIndex = index;
      }
      if (answer.failures > arr[mostFailIndex].failures) {
        mostFailIndex = index;
      }
    });

    return {
      mostHit: `pregunta ${mostHitIndex + 1}`,
      mostFailure: `pregunta ${mostFailIndex + 1}`,
    };
  }, [answersHitsFailures]);

  const length = useMemo(
    () => (answersHitsFailures.length < 6 ? 1 : 1.6),
    [answersHitsFailures],
  );

  return (
    <View style={styles.reportsContainer}>
      <TextCourse leftText="Resumen de preguntas" rightText="" />
      <View style={styles.colorBoxesContainer}>
        <View style={styles.boxWithTextContainer}>
          <View
            style={[styles.colorBox, { backgroundColor: Colors.greenLight }]}
          />
          <Text style={styles.boxText}>Aciertos</Text>
        </View>
        <View style={styles.boxWithTextContainer}>
          <View
            style={[styles.colorBox, { backgroundColor: Colors.redLight }]}
          />
          <Text style={styles.boxText}>Fallos</Text>
        </View>
      </View>
      <ScrollView horizontal={true}>
        <StackedBarChart
          style={styles.graphStyle}
          data={dataStackedBar}
          width={screenWidth * length}
          height={220}
          chartConfig={chartConfig}
          withHorizontalLabels={false}
          hideLegend={false}
          decimalPlaces={0}
          fromZero
        />
      </ScrollView>
      <View style={styles.containerTextBarChar}>
        <Text style={styles.textBarChar}>
          <Text>Más aciertos: </Text>
          <Text style={{ fontWeight: '700' }}>{info.mostHit}</Text>
        </Text>
        <Text style={styles.textBarChar}>
          <Text>Más fallos: </Text>
          <Text style={{ fontWeight: '700' }}>{info.mostFailure}</Text>
        </Text>
      </View>
    </View>
  );
};

const ReportsComponentPieChart = ({
  evaluationScores,
}: Pick<IStudentsReportProps, 'evaluationScores'>) => {
  const totalStudents = useMemo(
    () =>
      Number(evaluationScores.scoreLt14) +
      Number(evaluationScores.scoreGte14) +
      Number(evaluationScores.noEvaluation),
    [evaluationScores],
  );

  const percentages = useMemo(() => {
    return {
      approved: (evaluationScores.scoreGte14 * 100) / totalStudents,
      notApproved: (evaluationScores.scoreLt14 * 100) / totalStudents,
      noEvaluation: (evaluationScores.noEvaluation * 100) / totalStudents,
    };
  }, [totalStudents, evaluationScores]);

  const dataPieChart = useMemo(
    () => [
      {
        name: 'Aprobados',
        population: percentages.approved,
        originValue: evaluationScores.scoreGte14,
        color: Colors.greenLight,
        legendFontColor: Colors.greenDark,
        legendFontSize: 11,
      },
      {
        name: 'Reprobados',
        population: percentages.notApproved,
        originValue: evaluationScores.scoreLt14,
        color: Colors.redLight,
        legendFontColor: Colors.redDark,
        legendFontSize: 11,
      },
      {
        name: 'Ausentes',
        population: percentages.noEvaluation,
        originValue: evaluationScores.noEvaluation,
        color: Colors.primaryLight,
        legendFontColor: Colors.primaryDark,
        legendFontSize: 11,
      },
    ],
    [percentages],
  );

  return (
    <View style={styles.reportsContainer}>
      <TextCourse
        leftText="Número de estudiantes"
        rightText={totalStudents.toString()}
      />
      {/* <Text style={[styles.subText, { marginTop: 8 }]}>Lección 1</Text> */}
      <PieChart
        style={styles.graphStyle}
        data={dataPieChart}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={Colors.white}
        center={[10, 0]}
        absolute={false} //porcentajes o numero
        paddingLeft="2"
      />
      <View style={styles.pieLabelContainer}>
        {dataPieChart.map((item, index) => (
          <View key={index} style={styles.pieLabelItem}>
            <View
              style={[styles.pieLabelDot, { backgroundColor: item.color }]}
            />
            <Text
              style={{
                color: item.legendFontColor,
                fontSize: item.legendFontSize,
              }}
            >
              {item.name}: {item.originValue}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reportsContainer: {
    padding: 12,
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
  },
  colorBoxesContainer: {
    flexDirection: 'row', // Alinea los cuadros horizontalmente
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    marginVertical: 10, // Espaciado vertical
  },
  boxWithTextContainer: {
    flexDirection: 'row', // Alinea el cuadro y el texto en fila
    alignItems: 'center', // Centra verticalmente
    marginHorizontal: 10, // Espaciado entre los cuadros
  },
  colorBox: {
    width: 20, // Ancho de cada cuadro
    height: 20, // Alto de cada cuadro
    marginRight: 5, // Espaciado a la derecha del cuadro
  },
  boxText: {
    fontSize: 16, // Tamaño de fuente del texto
    color: Colors.black, // Color del texto (puedes ajustarlo según tu diseño)
  },
  graphStyle: {
    borderRadius: 0,
    paddingRight: 32,
  },
  pieLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pieLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pieLabelDot: {
    width: 15,
    height: 15,
    marginRight: 5,
  },

  subText: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 16,
  },
  textBarChar: {
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'left',
  },
  containerTextBarChar: {
    marginVertical: 0,
  },
});
