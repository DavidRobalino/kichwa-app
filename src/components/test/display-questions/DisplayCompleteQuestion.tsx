// Este código define un componente 'DisplayCompleteQuestion' que muestra una pregunta con sus opciones. 
// Recibe tres props: 'index' para mostrar el número de la pregunta, 'question' para el texto de la pregunta, 
// y 'options' que contiene un arreglo de objetos con las opciones de respuesta, donde cada opción tiene un texto, 
// un estado que indica si ha sido elegida ('isChoose') y si es correcta ('isRight'). 
// El componente calcula el estado de la primera opción ('stateOption1') en función de si la opción ha sido seleccionada y si es correcta o no.
// Luego, muestra la pregunta con su número y la primera opción con su estado correspondiente (correcta, incorrecta o sin seleccionar).
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Option from '../questions/Option';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionCompleteQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean; isRight: boolean }[];
}

const DisplayCompleteQuestion = ({
  index,
  question,
  options,
}: IOptionCompleteQuestionProps) => {
  const stateOption1 = useMemo(() => {
    const { isChoose, isRight } = options[0];
    if (isChoose && isRight) return 'right';
    if (isChoose && !isRight) return 'wrong';
    return 'idle';
  }, [options]);

  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View>
        <Option
          state={stateOption1}
          label={options[0].text}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default DisplayCompleteQuestion;

const styles = StyleSheet.create({});
