// Este código define un componente 'CompleteQuestion' que representa una pregunta de opción completa en una evaluación.
// El componente recibe la pregunta, su índice y una lista de opciones como props. Muestra el número de la pregunta y el texto de la pregunta usando el componente 'QuestionLabel'.
// Además, incluye un campo de entrada 'BaseInput' donde el usuario puede escribir su respuesta. 
// Al cambiar el texto en el campo de entrada, se actualiza el estado de la evaluación usando el método 'updateCompleteQuestion' del store, que guarda la respuesta del usuario.

import React from 'react';
import { StyleSheet, View } from 'react-native';

import BaseInput from 'src/components/common/inputs/BaseInput';
import useEvaluationStore from 'src/stores/useEvaluationStore';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionCompleteQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean }[];
}

const CompleteQuestion = ({
  index,
  question,
  options,
}: IOptionCompleteQuestionProps) => {
  const { updateCompleteQuestion } = useEvaluationStore();

  const handleOnChange = (value: string) => {
    updateCompleteQuestion(index, 0, value);
  };

  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View>
        <BaseInput
          label="Respuesta"
          placeholder="marcapasos"
          value={options[0].text}
          onChangeText={handleOnChange}
          required
        />
      </View>
    </View>
  );
};

export default CompleteQuestion;

const styles = StyleSheet.create({});
