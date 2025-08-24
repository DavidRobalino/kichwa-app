// Este código define un componente 'QuestionController' que se encarga de renderizar diferentes tipos de preguntas según el tipo de pregunta recibido en las props.
// Dependiendo del valor del tipo de pregunta ('MULTIPLE_CHOICE', 'COMPLETE', 'TRUE_FALSE'), se renderiza uno de los siguientes componentes:
// 'OptionMultipleQuestion' para preguntas de opción múltiple, 'CompleteQuestion' para preguntas de completar texto, y 'TrueOrFalseQuestion' para preguntas de verdadero o falso.
// Cada componente recibe el índice de la pregunta y las opciones como props para mostrarlas adecuadamente.

import React from 'react';
import { StyleSheet } from 'react-native';

import { QuestionType } from 'src/models/Question.model';
import { CreateAnswerValues } from 'src/models/StudentAnswer.model';
import CompleteQuestion from './CompleteQuestion';
import OptionMultipleQuestion from './OptionMultipleQuestion';
import TrueOrFalseQuestion from './TrueOrFalseQuestion';

interface IQuestionControllerProps {
  answer: CreateAnswerValues;
  index: number;
}

const QuestionController = ({ answer, index }: IQuestionControllerProps) => {
  return (
    <>
      {answer.type === QuestionType.MULTIPLE_CHOICE && (
        <OptionMultipleQuestion
          index={index}
          question={answer.questionText}
          options={answer.options}
        />
      )}
      {answer.type === QuestionType.COMPLETE && (
        <CompleteQuestion
          index={index}
          question={answer.questionText}
          options={answer.options}
        />
      )}
      {answer.type === QuestionType.TRUE_FALSE && (
        <TrueOrFalseQuestion
          index={index}
          question={answer.questionText}
          options={answer.options}
        />
      )}
    </>
  );
};

export default QuestionController;

const styles = StyleSheet.create({});
