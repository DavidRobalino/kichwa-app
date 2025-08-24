// Este código define un componente 'QuestionLabel' que muestra una pregunta con un formato específico. 
// El componente recibe dos props: 'bullet' que representa un marcador (por ejemplo, un número o símbolo) y 'text' que es el contenido de la pregunta. 
// El componente organiza estos elementos en una fila usando 'flexDirection: row', donde el marcador se muestra en un tamaño mayor que el texto de la pregunta.
// Se usa 'Text' de React Native para mostrar el marcador y el texto de la pregunta con estilos personalizados.

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IQuestionLabelProps {
  bullet: string;
  text: string;
}

const QuestionLabel = ({ bullet, text }: IQuestionLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{bullet}</Text>
      <Text style={styles.questionText}>{text}</Text>
    </View>
  );
};

export default QuestionLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  labelText: {
    fontSize: 28,
    fontWeight: '700',
    marginRight: 8,
  },
  questionText: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
