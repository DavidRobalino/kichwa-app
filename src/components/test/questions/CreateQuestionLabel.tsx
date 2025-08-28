// Este código define un componente 'CreateQuestionLabel' que muestra una etiqueta de pregunta junto con un texto para eliminarla. 
// Recibe dos props: 'label', que es el texto de la etiqueta, y 'onRemove', una función que se ejecuta cuando se presiona el texto 'Eliminar'.
// El diseño está compuesto por un contenedor con una fila horizontal, donde el texto de la etiqueta se muestra a la izquierda y el texto de eliminación a la derecha, 
// con un estilo subrayado y de color rojo. El componente permite al usuario eliminar la etiqueta al hacer clic en el texto 'Eliminar'.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';

interface ICreateQuestionLabelProps {
  label: string;
  onRemove: () => void;
}

const CreateQuestionLabel = ({
  label,
  onRemove,
}: ICreateQuestionLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.removeText} onPress={onRemove}>
        Eliminar
      </Text>
    </View>
  );
};

export default CreateQuestionLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  labelText: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  removeText: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: Colors.red,
  },
});
