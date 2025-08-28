// Este código define un componente 'ProgressBarTest' que muestra una barra de progreso con una etiqueta.
// La barra de progreso refleja la relación entre el valor 'current' (valor actual) y 'total' (valor total), calculando el progreso como un porcentaje.
// El componente recibe tres props: 'label' para mostrar un texto al lado de la barra, 'current' para el valor actual y 'total' para el valor máximo.
// La barra tiene un diseño personalizado con un color verde y un borde verde, y su tamaño se ajusta automáticamente al ancho disponible.
import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import * as Progress from 'react-native-progress';

import { Colors } from 'src/constants/Colors';

interface IProgressBarTestProps {
  label: string;
  current: number;
  total: number;
}

const ProgressBarTest = ({ current, label, total }: IProgressBarTestProps) => {
  const progress = useMemo(() => current / total, [current, total]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Progress.Bar
        borderRadius={5}
        color={Colors.green}
        borderColor={Colors.green}
        progress={progress}
        width={null}
        height={20}
      />
    </View>
  );
};

export default ProgressBarTest;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  label: {
    textAlign: 'right',
    fontSize: 16,
    color: Colors.black,
  },
});
