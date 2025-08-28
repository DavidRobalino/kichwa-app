import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import { PictureUtils } from 'src/utils/Picture.util';

interface IImagePickerInput {
  image: string | null;
  setImage: (uri: string | null) => void;
  label: string;
  required?: boolean;
  aspect?: [number, number];
}

const ImagePickerInput = ({
  image,
  setImage,
  label,
  required,
  aspect = [4, 3],
}: IImagePickerInput) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        'Advertencia',
        '¡Te has negado a permitir que esta aplicación acceda a tus fotos!',
      );
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.75,
      aspect,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text>{label} </Text>
        {required && <Text style={{ color: Colors.red }}>*</Text>}
      </Text>
      <View style={styles.containerPicture}>
        {image && (
          <>
            <Image
              source={{
                uri: PictureUtils.getAbsoluteUrl(image),
              }}
              style={styles.picture}
            />
            <View style={styles.containerRemove}>
              <Pressable
                style={styles.btnRemove}
                onPress={() => setImage(null)}
                android_ripple={{ color: '' }}
              >
                <AntDesign name="delete" size={28} color={Colors.red} />
              </Pressable>
            </View>
          </>
        )}
        {!image && (
          <Pressable onPress={pickImage}>
            <Text>Seleccionar foto</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ImagePickerInput;

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
  picture: {
    height: 150,
    width: '100%',
    objectFit: 'contain',
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
