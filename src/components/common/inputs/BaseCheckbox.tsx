import Checkbox from 'expo-checkbox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';

interface IBaseCheckboxProps {
  label?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
  inputRef?: React.LegacyRef<View>;
  checkedColor?: string;
  required?: boolean;
}

const BaseCheckbox: React.FC<IBaseCheckboxProps> = ({
  label,
  onChangeValue,
  value,
  inputRef,
  checkedColor = Colors.primary,
  required = false,
}) => {
  return (
    <View ref={inputRef} style={styles.container}>
      {label && (
        <Text style={styles.label}>
          <Text>{label} </Text>
          {required && <Text style={{ color: Colors.red }}>*</Text>}
        </Text>
      )}
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onChangeValue}
        color={value ? checkedColor : undefined}
      />
    </View>
  );
};

export default BaseCheckbox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
    columnGap: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: Colors.blackTitle,
    flexShrink: 1,
  },
  checkbox: {
    borderRadius: 10,
    height: 35,
    width: 35,
  },
});
