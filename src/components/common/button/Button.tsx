// Este componente Button de React Native crea un botón personalizable que puede tener diferentes estados: 
// activo, deshabilitado y en espera. Acepta propiedades para ajustar su color, tamaño, borde, y estado 
// (deshabilitado o esperando). Si está en espera, muestra un indicador de carga (ActivityIndicator). 
// Los estilos se calculan dinámicamente usando useMemo según las propiedades pasadas al componente.
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from 'src/constants/Colors';

interface ButtonProps {
  text: string;
  onClick: () => void;
  buttonColor?: string;
  textColor?: string;
  borderColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  disable?: boolean;
  waiting?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  buttonColor = Colors.primary,
  textColor = Colors.white,
  borderColor,
  width = '100%',
  height = 46,
  disable = false,
  waiting = false,
}) => {
  const btnStyles = useMemo(() => {
    if (disable) {
      return {
        button: [styles.button, styles.buttonDisabled],
        text: [styles.buttonText, styles.textDisabled],
      };
    }
    if (waiting) {
      return {
        button: [styles.button, styles.buttonWaiting],
        text: [styles.buttonText, styles.textWaiting],
      };
    }
    if (borderColor) {
      return {
        button: [
          styles.button,
          { backgroundColor: buttonColor, borderWidth: 1, borderColor },
        ],
        text: [styles.buttonText, { color: textColor }],
      };
    }
    return {
      button: [styles.button, { backgroundColor: buttonColor }],
      text: [styles.buttonText, { color: textColor }],
    };
  }, [disable, waiting, buttonColor, borderColor, textColor]);

  return (
    <Pressable
      disabled={disable || waiting}
      style={[btnStyles.button, { width, height }]}
      onPress={onClick}
      android_ripple={{ color: '' }}
    >
      <View style={styles.containerTxtAndSpinner}>
        <Text style={btnStyles.text}>{text}</Text>
        {waiting && (
          <ActivityIndicator
            style={styles.spinner}
            color="#ffffff"
            size="small"
          />
        )}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  containerTxtAndSpinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // disabled styles
  buttonDisabled: {
    backgroundColor: Colors.gray,
  },
  textDisabled: {
    color: Colors.black,
  },
  // waiting styles
  buttonWaiting: {
    backgroundColor: Colors.primaryDark,
  },
  textWaiting: {
    color: Colors.white,
  },
  spinner: {
    marginStart: 8,
  },
});
