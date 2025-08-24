// Este código define un componente 'DisplayTrueOrFalseQuestion' que muestra una pregunta de verdadero o falso con dos opciones de respuesta: 'Falso' y 'Verdadero'.
// Recibe tres props: 'index' para el número de la pregunta, 'question' para el texto de la pregunta,
// y 'options' que contiene un arreglo de objetos con las opciones de respuesta.
// Cada opción tiene un texto, un estado que indica si ha sido elegida ('isChoose') y si es correcta ('isRight').
// Utiliza 'useMemo' para calcular el estado de cada opción ('right', 'wrong', o 'idle') en función de si la opción fue seleccionada y si es correcta o no.
// Luego, muestra la pregunta y las opciones correspondientes con su estado calculado.
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Option from '../questions/Option';
import QuestionLabel from '../questions/QuestionLabel';

interface IOptionTrueOrFalseQuestionProps {
  index: number;
  question: string;
  options: { text: string; isChoose: boolean; isRight: boolean }[];
}

const DisplayTrueOrFalseQuestion = ({
  index,
  options,
  question,
}: IOptionTrueOrFalseQuestionProps) => {
  /**
   * isChoose true && isRight true -> right
   *
   * isChoose true && isRight false -> wrong
   *
   * isChoose false && isRight true -> idle
   *
   * isChoose false && isRight false -> idle
   */
  const stateOption1 = useMemo(() => {
    const { isChoose, isRight } = options[0];
    if (isChoose && isRight) return 'right';
    if (isChoose && !isRight) return 'wrong';
    return 'idle';
  }, [options]);

  const stateOption2 = useMemo(() => {
    const { isChoose, isRight } = options[1];
    if (isChoose && isRight) return 'right';
    if (isChoose && !isRight) return 'wrong';
    return 'idle';
  }, [options]);

  return (
    <View>
      <QuestionLabel bullet={`${index + 1}.`} text={question} />
      <View style={styles.containerOptions}>
        <Option state={stateOption1} label="Falso" onPress={() => {}} />
        <Option state={stateOption2} label="Verdadero" onPress={() => {}} />
      </View>
    </View>
  );
};

export default DisplayTrueOrFalseQuestion;

const styles = StyleSheet.create({
  containerOptions: {
    marginTop: 8,
    flexDirection: 'column',
    rowGap: 16,
  },
});
