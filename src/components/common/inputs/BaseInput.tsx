import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors } from 'src/constants/Colors';
import { TAntDesignIconName } from 'src/constants/IconNames';

export type AntDesignIconName = TAntDesignIconName;

type BaseInputProps = {
  label?: string;
  placeholder: string;
  // props opcionales
  inputRef?: React.LegacyRef<TextInput>;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  iconName?: AntDesignIconName; // El signo de interrogación indica que es opcional
  error?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  multiline?: boolean;
};

const BaseInput: React.FC<BaseInputProps> = ({
  placeholder,
  // props opcionales
  label,
  iconName,
  error,
  autoCapitalize,
  defaultValue,
  inputRef,
  keyboardType,
  onBlur,
  onChangeText,
  required,
  value,
  multiline,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          <Text>{label} </Text>
          {required && <Text style={{ color: Colors.red }}>*</Text>}
        </Text>
      )}
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
          style={[
            styles.input,
            !!error && styles.errorInput,
            multiline ? { height: 'auto', alignItems: 'flex-start' } : {},
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          placeholderTextColor={Colors.grayDark}
          cursorColor={error ? Colors.red : Colors.primary}
          // extra configs
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          numberOfLines={multiline ? 5 : undefined}
          multiline={multiline}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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

export default BaseInput;
