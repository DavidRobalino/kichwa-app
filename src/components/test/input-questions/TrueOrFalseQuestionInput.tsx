import React from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import ControlledInput from 'src/components/common/forms/ControlledInput';
import CreateQuestionLabel from '../questions/CreateQuestionLabel';
import Option from '../questions/Option';
import { CreateEvaluationValues } from 'src/models/Evaluation.model';

interface IQuestionInputProps {
  control: Control<any>;
  index: number;
  name: string;
  onRemove: () => void;
  setValue: UseFormSetValue<CreateEvaluationValues>;
}

const TrueOrFalseQuestionInput = ({
  control,
  name,
  index,
  onRemove,
  setValue,
}: IQuestionInputProps) => {
  return (
    <View style={{ marginBottom: 8 }}>
      <CreateQuestionLabel
        label={`${index}. Pregunta de verdadero o falso`}
        onRemove={onRemove}
      />
      <ControlledInput
        label="Pregunta"
        control={control}
        name={`${name}.title`}
        placeholder="¿Juan dice si o no?"
        validations={{ required: 'Se necesita este campo' }}
        required
      />
      <View style={styles.optionsContainer}>
        <View style={{ width: '100%', flexShrink: 1 }}>
          <Controller
            name={`${name}.options.0.isRight`}
            control={control}
            render={({ field }) => (
              <Option
                state={field.value ? 'right' : 'idle'}
                label="Falso"
                onPress={() => {
                  setValue(`${name}.options.1.isRight` as any, false);
                  field.onChange(true);
                }}
              />
            )}
          />
        </View>
        <View style={{ width: '100%', flexShrink: 1 }}>
          <Controller
            name={`${name}.options.1.isRight`}
            control={control}
            render={({ field }) => (
              <Option
                state={field.value ? 'right' : 'idle'}
                label="Verdadero"
                onPress={() => {
                  setValue(`${name}.options.0.isRight` as any, false);
                  field.onChange(true);
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default TrueOrFalseQuestionInput;

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    width: '100%',
  },
});
