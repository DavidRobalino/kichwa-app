import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define la interfaz de los props
interface TextCourseProps {
  leftText: string;
  rightText: string;
}

const TextCourse: React.FC<TextCourseProps> = ({ leftText, rightText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{leftText}</Text>
      <Text style={styles.rightText}>{rightText}</Text>
    </View>
  );
};

export default TextCourse;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Coloca los textos en una fila
    justifyContent: 'space-between', // Distribuye los textos a la izquierda y derecha
  },
  leftText: {
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold', // Hacerlo en negrita
  },
  rightText: {
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold', // Hacerlo en negrita
  },
});
