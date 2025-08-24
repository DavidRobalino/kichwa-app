// Este código define un componente 'OptionMultipleQuestion' que representa una pregunta de opción múltiple en una evaluación.
// El componente recibe la pregunta, su índice y las opciones posibles como props. 
// Muestra el número de la pregunta y el texto de la pregunta usando el componente 'QuestionLabel'.
// Luego, mapea las opciones y las muestra usando el componente 'Option'. Cada opción tiene un estado de selección que cambia cuando el usuario hace clic sobre ella, 
// lo que actualiza el estado de la evaluación mediante el método 'updateMultipleQuestion' del store.

import React from 'react';
import { StyleSheet, View } from 'react-native';

import useEvaluationStore from 'src/stores/useEvaluationStore';
import Option from '../questions/Option';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionMultipleQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean }[];
}

const OptionMultipleQuestion = ({
  index,
  options,
  question,
}: IOptionMultipleQuestionProps) => {
  const { updateMultipleQuestion } = useEvaluationStore();

  const handlePressOption = (optIndex: number, value: boolean) => {
    updateMultipleQuestion(index, optIndex, value);
  };

  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View style={styles.containerOptions}>
        {options.map((opt, optIndex) => (
          <Option
            key={optIndex}
            label={opt.text}
            onPress={() => handlePressOption(optIndex, !opt.isChoose)}
            state={opt.isChoose ? 'choose' : 'idle'}
          />
        ))}
      </View>
    </View>
  );
};

export default OptionMultipleQuestion;

const styles = StyleSheet.create({
  containerOptions: {
    marginTop: 8,
    flexDirection: 'column',
    rowGap: 16,
  },
});
