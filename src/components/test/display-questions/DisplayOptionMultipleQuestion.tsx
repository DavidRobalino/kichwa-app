// Este código define un componente 'DisplayOptionMultipleQuestion' que muestra una pregunta con múltiples opciones de respuesta. 
// Recibe tres props: 'index' para mostrar el número de la pregunta, 'question' para el texto de la pregunta, 
// y 'options' que contiene un arreglo de objetos con las opciones de respuesta. 
// Cada opción tiene un texto, un estado que indica si ha sido elegida ('isChoose') y si es correcta ('isRight').
// El componente recorre las opciones y para cada una, calcula su estado ('right', 'wrong', o 'idle') en función de si ha sido seleccionada y si es correcta o no.
// Luego, muestra la pregunta y las opciones correspondientes con el estado calculado.
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Option from '../questions/Option';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionMultipleQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean; isRight: boolean }[];
}

const DisplayOptionMultipleQuestion = ({
  index,
  options,
  question,
}: IOptionMultipleQuestionProps) => {
  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View style={styles.containerOptions}>
        {options.map((opt, optIndex) => (
          <Option
            key={optIndex}
            label={opt.text}
            onPress={() => {}}
            state={
              opt.isChoose && opt.isRight
                ? 'right'
                : opt.isChoose && !opt.isRight
                ? 'wrong'
                : 'idle'
            }
          />
        ))}
      </View>
    </View>
  );
};

export default DisplayOptionMultipleQuestion;

const styles = StyleSheet.create({
  containerOptions: {
    marginTop: 8,
    flexDirection: 'column',
    rowGap: 16,
  },
});
