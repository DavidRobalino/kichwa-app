import AntDesign from '@expo/vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';

interface IFilePickerInput {
  file: string | null;
  setFile: (uri: string | null) => void;
  label: string;
  required?: boolean;
}

const FilePickerInput = ({
  file,
  setFile,
  label,
  required,
}: IFilePickerInput) => {
  const [data, setData] = useState<DocumentPicker.DocumentPickerAsset>();
  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: ['application/pdf'],
    });
    console.log(result);
    if (!result.canceled) {
      setFile(result.assets[0].uri);
      setData(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text>{label} </Text>
        {required && <Text style={{ color: Colors.red }}>*</Text>}
      </Text>
      <View style={styles.containerPicture}>
        {file && (
          <>
            <Text>{data?.name}</Text>
            <View style={styles.containerRemove}>
              <Pressable
                style={styles.btnRemove}
                onPress={() => setFile(null)}
                android_ripple={{ color: '' }}
              >
                <AntDesign name="delete" size={28} color={Colors.red} />
              </Pressable>
            </View>
          </>
        )}
        {!file && (
          <Pressable onPress={pickImage}>
            <Text>Seleccionar documento</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FilePickerInput;

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
  containerPicture: {
    position: 'relative',
    backgroundColor: Colors.grayLight,
    borderRadius: 5,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRemove: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  btnRemove: {
    backgroundColor: Colors.redLight,
    padding: 8,
    borderRadius: 12,
  },
});
