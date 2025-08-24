// Este código define un componente 'TrueOrFalseQuestion' que maneja una pregunta de tipo verdadero o falso.
// El componente recibe el índice de la pregunta, el texto de la pregunta y las opciones (Falso, Verdadero) como props.
// El estado de cada opción se determina según si está seleccionada o no, y al hacer clic en una opción se actualiza el estado de la respuesta utilizando la función 'updateTrueOrFalseQuestion' de un store.
// El componente renderiza las opciones de "Falso" y "Verdadero", y cambia el estado visual de las opciones según la selección del usuario.
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useEvaluationStore from 'src/stores/useEvaluationStore';
import Option from '../questions/Option';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionTrueOrFalseQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean }[];
}

const TrueOrFalseQuestion = ({
  index,
  question,
  options,
}: IOptionTrueOrFalseQuestionProps) => {
  const { updateTrueOrFalseQuestion } = useEvaluationStore();

  const handlePress = (b: boolean, optIndex: number) => {
    updateTrueOrFalseQuestion(index, optIndex, b);
  };

  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View style={styles.containerOptions}>
        <Option
          state={options[0].isChoose ? 'choose' : 'idle'}
          label="Falso"
          onPress={() => handlePress(true, 0)}
        />
        <Option
          state={options[1].isChoose ? 'choose' : 'idle'}
          label="Verdadero"
          onPress={() => handlePress(true, 1)}
        />
      </View>
    </View>
  );
};

export default TrueOrFalseQuestion;

const styles = StyleSheet.create({
  containerOptions: {
    marginTop: 8,
    flexDirection: 'column',
    rowGap: 16,
  },
});
