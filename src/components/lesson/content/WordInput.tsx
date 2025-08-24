// Este componente WordInput renderiza dos campos de entrada controlados para ingresar palabras en kichwa 
// y español. Permite eliminar el bloque de entradas mediante un botón "Eliminar". Los campos están validados 
// para requerir información en ambos idiomas. El estilo de la tarjeta se define utilizando GlobalStyles.card, 
// y el botón de eliminación se posiciona en la esquina superior derecha.
import React from 'react';
import { Control } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import ControlledInput from 'src/components/common/forms/ControlledInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';

interface IWordInputProps {
  control: Control<any>;
  name: string;
  onRemove: () => void;
}

const WordInput = ({ control, name, onRemove }: IWordInputProps) => {
  return (
    <View
      style={[
        GlobalStyles.card,
        { marginBottom: 12, width: '100%', position: 'relative' },
      ]}
    >
      <Text style={styles.remove} onPress={onRemove}>
        Eliminar
      </Text>
      <ControlledInput
        label="Kichwa"
        placeholder="palabra en kichwa"
        name={`${name}.kichwa`}
        control={control}
        validations={{ required: 'Se necesita este campo' }}
        required
      />
      <ControlledInput
        label="Español"
        placeholder="palabra en español"
        name={`${name}.spanish`}
        control={control}
        validations={{ required: 'Se necesita este campo' }}
        required
      />
    </View>
  );
};

export default WordInput;

const styles = StyleSheet.create({
  remove: {
    color: Colors.red,
    position: 'absolute',
    right: 12,
    top: 6,
    textDecorationLine: 'underline',
  },
});
