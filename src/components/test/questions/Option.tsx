// Este código define un componente 'Option' que representa una opción interactiva con un estilo dinámico basado en su estado ('idle', 'choose', 'right', 'wrong').
// El componente recibe una serie de props: 'state' que determina el estilo de la opción, 'onPress' que es una función que se ejecuta al seleccionar la opción, 
// 'label' que es el texto mostrado, y opcionalmente 'bullet' para agregar una viñeta antes del texto.
// Dependiendo del estado, el componente cambia su color de fondo, borde y texto, usando colores definidos en el archivo 'Colors'. 
// El componente es presionable y está diseñado para ser usado en interfaces de preguntas y respuestas.

import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from 'src/constants/Colors';

interface IOptionProps {
  state?: 'idle' | 'choose' | 'right' | 'wrong';
  onPress: () => void;
  bullet?: string;
  label: string;
}

const Option = ({ state = 'idle', onPress, label, bullet }: IOptionProps) => {
  const { backgroundColor, borderColor, color } = useMemo(() => {
    if (state === 'choose') {
      return {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
        color: Colors.primary,
      };
    } else if (state === 'right') {
      return {
        backgroundColor: Colors.greenLight,
        borderColor: Colors.greenDark,
        color: Colors.greenDark,
      };
    } else if (state === 'wrong') {
      return {
        backgroundColor: Colors.redLight,
        borderColor: Colors.redDark,
        color: Colors.redDark,
      };
    } else {
      return {
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        color: Colors.black,
      };
    }
  }, [state]);

  return (
    <Pressable
      style={[styles.container, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      {bullet && <Text style={[styles.labelText, { color }]}>a{')'}</Text>}
      <Text style={[styles.answerText, { color }]}>{label}</Text>
    </Pressable>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  labelText: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
  answerText: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
