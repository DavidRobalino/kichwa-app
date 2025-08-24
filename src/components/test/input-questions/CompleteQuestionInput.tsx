import React from 'react';
import { Control } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import ControlledInput from 'src/components/common/forms/ControlledInput';
import CreateQuestionLabel from '../questions/CreateQuestionLabel';

interface IQuestionInputProps {
  control: Control<any>;
  index: number;
  name: string;
  onRemove: () => void;
}

const CompleteQuestionInput = ({
  control,
  name,
  index,
  onRemove,
}: IQuestionInputProps) => {
  return (
    <View style={{ marginBottom: 8 }}>
      <CreateQuestionLabel
        label={`${index}. Pregunta de completar`}
        onRemove={onRemove}
      />
      <Text>
        Usa los caracteres ____ para especificar la palabra a completar.
      </Text>
      <ControlledInput
        label=""
        control={control}
        name={`${name}.title`}
        placeholder="Marta tiene un _____, que..."
        validations={{ required: 'Se necesita este campo' }}
      />
      <ControlledInput
        label="Respuesta"
        placeholder="marcapasos"
        control={control}
        name={`${name}.options.0.text`}
        validations={{ required: 'Se necesita este campo' }}
        required
      />
    </View>
  );
};

export default CompleteQuestionInput;

const styles = StyleSheet.create({});
