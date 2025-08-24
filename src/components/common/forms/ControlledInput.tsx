// Este componente ControlledInput es un campo de entrada controlado que se integra con react-hook-form 
// para manejar formularios. Utiliza useController para conectar el estado del formulario al campo de entrada,
//  gestionando el valor y las validaciones del campo. Además, permite la personalización del campo con propiedades
//  como label, placeholder, keyboardType, multiline, y iconName. También maneja errores de validación y el auto
//  recorte del texto al perder el foco.
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { KeyboardTypeOptions } from 'react-native';

import BaseInput, { AntDesignIconName } from '../inputs/BaseInput';

export interface InputProps {
  label: string;
  name: string;
  control: Control<any>;
  // props opcionales
  multiline?: boolean;
  defaultValue?: string;
  placeholder?: string;
  validations?: any;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  iconName?: AntDesignIconName;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const ControlledInput = ({
  label,
  name,
  control,
  validations = {},
  required = false,
  placeholder = '',
  defaultValue = '',
  keyboardType = 'default',
  autocapitalize = 'sentences',
  iconName,
  multiline = false,
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: validations, defaultValue });

  const handleOnBlur = () => {
    try {
      if (field.value) field.onChange(field.value.trim());
    } catch (error) {}
    field.onBlur();
  };

  return (
    <BaseInput
      key={name}
      label={label}
      inputRef={field.ref}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={handleOnBlur}
      placeholder={placeholder}
      required={required}
      error={error?.message}
      autoCapitalize={autocapitalize}
      keyboardType={keyboardType}
      iconName={iconName}
      multiline={multiline}
    />
  );
};

export default ControlledInput;
