// Este componente ControlledCheckbox es un checkbox controlado que se integra con react-hook-form. 
// Recibe varias propiedades, incluyendo el nombre del campo, el control de formulario, y validaciones opcionales.
//  Utiliza useController para gestionar el estado del formulario y conecta el checkbox con el formulario, pasando
//  las funciones necesarias (como onChange y value) a un componente BaseCheckbox que maneja la interfaz de usuario.
//  También soporta propiedades opcionales como label, defaultValue y checkedColor.
import React from 'react';
import { Control, useController } from 'react-hook-form';

import BaseCheckbox from '../inputs/BaseCheckbox';

export interface CheckboxProps {
  name: string;
  control: Control<any>;
  // props opcionales
  label?: string;
  defaultValue?: boolean;
  validations?: any;
  required?: boolean;
  checkedColor?: string;
}

const ControlledCheckbox = ({
  label,
  name,
  control,
  validations = {},
  required = false,
  defaultValue,
  checkedColor,
}: CheckboxProps) => {
  const { field } = useController({
    control,
    name,
    rules: validations,
    defaultValue,
  });

  return (
    <BaseCheckbox
      key={name}
      label={label}
      inputRef={field.ref}
      value={field.value}
      onChangeValue={field.onChange}
      required={required}
      checkedColor={checkedColor}
    />
  );
};

export default ControlledCheckbox;
