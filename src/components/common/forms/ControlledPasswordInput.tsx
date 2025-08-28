// Este componente ControlledPasswordInput es un campo de entrada de contraseña controlado 
// que se integra con react-hook-form. Utiliza useController para gestionar el valor y las validaciones del campo. 
// Permite personalizar el campo con propiedades como label, required, y un iconName. Además, maneja errores de 
// validación y el auto recorte del texto al perder el foco.
import React from 'react';
import { Control, useController } from 'react-hook-form';

import { AntDesignIconName } from '../inputs/BaseInput';
import BasePasswordInput from '../inputs/BasePasswordInput';

export interface InputProps {
  label: string;
  name: string;
  control: Control<any>;
  // props opcionales
  validations?: any;
  required?: boolean;
  iconName?: AntDesignIconName;
}

const ControlledPasswordInput = ({
  label,
  name,
  control,
  validations = {},
  required = false,
  iconName = 'key',
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: validations, defaultValue: '' });

  const handleOnBlur = () => {
    try {
      if (field.value) field.onChange(field.value.trim());
    } catch (error) {}
    field.onBlur();
  };

  return (
    <BasePasswordInput
      key={name}
      label={label}
      inputRef={field.ref}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={handleOnBlur}
      required={required}
      error={error?.message}
      iconName={iconName}
    />
  );
};

export default ControlledPasswordInput;
