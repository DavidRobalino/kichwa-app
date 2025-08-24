import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import ControlledInput from 'src/components/common/forms/ControlledInput';
import BaseCheckbox from 'src/components/common/inputs/BaseCheckbox';
import BaseInput from 'src/components/common/inputs/BaseInput';
import CreateQuestionLabel from '../questions/CreateQuestionLabel';

interface IQuestionInputProps {
  control: Control<any>;
  name: string;
  index: number;
  onRemove: () => void;
}

const OptionMultipleQuestionInput = ({
  control,
  name,
  index,
  onRemove,
}: IQuestionInputProps) => {
  return (
    <View style={{ marginBottom: 8 }}>
      <CreateQuestionLabel
        label={`${index}. Pregunta de opción multiple`}
        onRemove={onRemove}
      />
      <ControlledInput
        control={control}
        label="Pregunta"
        name={`${name}.title`}
        placeholder="Como se dice..."
        validations={{ required: 'Se necesita este campo' }}
        required
      />
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Opciones:{' '}
      </Text>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Controller
            name={`${name}.options.0.text`}
            control={control}
            rules={{ required: 'Se necesita este campo' }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                placeholder="posible opción"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={error?.message}
              />
            )}
          />
        </View>
        <Controller
          name={`${name}.options.0.isRight`}
          control={control}
          render={({ field }) => (
            <BaseCheckbox
              value={field.value}
              inputRef={field.ref}
              onChangeValue={(value) => field.onChange(value)}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Controller
            name={`${name}.options.1.text`}
            control={control}
            rules={{ required: 'Se necesita este campo' }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                placeholder="posible opción"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={error?.message}
              />
            )}
          />
        </View>
        <Controller
          name={`${name}.options.1.isRight`}
          control={control}
          render={({ field }) => (
            <BaseCheckbox
              value={field.value}
              inputRef={field.ref}
              onChangeValue={(value) => field.onChange(value)}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Controller
            name={`${name}.options.2.text`}
            control={control}
            rules={{ required: 'Se necesita este campo' }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                placeholder="posible opción"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={error?.message}
              />
            )}
          />
        </View>
        <Controller
          name={`${name}.options.2.isRight`}
          control={control}
          render={({ field }) => (
            <BaseCheckbox
              value={field.value}
              inputRef={field.ref}
              onChangeValue={(value) => field.onChange(value)}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Controller
            name={`${name}.options.3.text`}
            control={control}
            rules={{ required: 'Se necesita este campo' }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                placeholder="posible opción"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={error?.message}
              />
            )}
          />
        </View>
        <Controller
          name={`${name}.options.3.isRight`}
          control={control}
          render={({ field }) => (
            <BaseCheckbox
              value={field.value}
              inputRef={field.ref}
              onChangeValue={(value) => field.onChange(value)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default OptionMultipleQuestionInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    columnGap: 8,
  },
  inputContainer: {
    width: '100%',
    flexShrink: 1,
  },
});
