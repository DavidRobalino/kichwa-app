import AntDesign from '@expo/vector-icons/AntDesign'; // Importa el ícono
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AntDesignIconName } from './BaseInput';
import { Colors } from 'src/constants/Colors';

type BaseInputProps = {
  label: string;
  iconName?: AntDesignIconName; // El signo de interrogación indica que es opcional
  error?: string;
  inputRef?: React.LegacyRef<TextInput>;
  value?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
};

const BasePasswordInput: React.FC<BaseInputProps> = ({
  label,
  iconName,
  error,
  inputRef,
  onBlur,
  onChangeText,
  required,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOnBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text>{label} </Text>
        {required && <Text style={{ color: Colors.red }}>*</Text>}
      </Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && !error && styles.focusedContainer,
          !!error && styles.errorContainer,
        ]}
      >
        {iconName && (
          <AntDesign
            name={iconName}
            size={28}
            color={
              error ? Colors.red : isFocused ? Colors.primary : Colors.grayDark
            }
            style={styles.icon}
          />
        )}
        <TextInput
          ref={inputRef}
          style={[styles.input, !!error && styles.errorInput]}
          onChangeText={onChangeText}
          placeholder="*********"
          cursorColor={error ? Colors.red : Colors.primary}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          placeholderTextColor={Colors.grayDark}
          secureTextEntry={!isPasswordVisible} // Cambia la propiedad secureTextEntry según el estado
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna entre mostrar/ocultar contraseña
          style={styles.icon}
          android_ripple={{ color: '', radius: 18 }}
        >
          <AntDesign
            size={28}
            name={isPasswordVisible ? 'eye' : 'eyeo'} // Cambia el ícono según el estado
            color={isPasswordVisible ? Colors.primary : Colors.grayDark}
          />
        </Pressable>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    marginBottom: 4,
    color: Colors.blackTitle,
  },
  inputContainer: {
    flexDirection: 'row', // Alinea el ícono y el TextInput horizontalmente
    alignItems: 'center', // Centra verticalmente el ícono y el TextInput
    borderWidth: 1, // Agrega el borde al contenedor
    borderColor: Colors.black, // Color de borde por defecto
    borderRadius: 5,
    paddingHorizontal: 8, // Espacio interno en el contenedor
    width: 'auto',
  },
  focusedContainer: {
    borderColor: Colors.primary, // Color de borde cuando está enfocado
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el TextInput
  },
  input: {
    fontSize: 16,
    height: 51,
    flex: 1, // Ocupa el espacio restante
    borderWidth: 0, // Elimina el borde del TextInput
    padding: 0, // Elimina el padding adicional
  },
  errorContainer: {
    borderColor: Colors.red, // Color del borde en caso de error
  },
  errorInput: {
    borderColor: Colors.red, // Color del borde del TextInput cuando hay un error
  },
  errorText: {
    color: Colors.red, // Color del texto de error
    marginTop: 5, // Espacio entre el campo de entrada y el mensaje de error
  },
});

export default BasePasswordInput;
