// El componente CreateResourceModal permite a los usuarios agregar o actualizar recursos (archivos)
//  para una lección. Ofrece un formulario donde se puede adjuntar un archivo y proporcionar un nombre
//  para el recurso. Al enviar el formulario, el recurso se guarda o actualiza en el servidor mediante 
// una solicitud POST o PUT. Si el formulario es válido, se muestra un mensaje de éxito y el modal se cierra.
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import Button from 'src/components/common/button/Button';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import FilePickerInput from 'src/components/common/inputs/FilePickerInput';
import { ModalStyles } from 'src/components/profile/modals/ModalStyles';
import { Colors } from 'src/constants/Colors';
import { Http } from 'src/libraries/Http';
import { Resource, ResourceValues } from 'src/models/Resource.model';

interface ICreateResourceModalProps {
  resource?: Resource;
  lessonId: number;
  refresh: () => void;
}

const CreateResourceModal = ({
  resource,
  lessonId,
  refresh,
}: ICreateResourceModalProps) => {
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const { control, handleSubmit, reset } = useForm<ResourceValues>({
    defaultValues: { name: '' },
  });

  const handleForm: SubmitHandler<ResourceValues> = async (data) => {
    console.log('data', data);
    // if (resource) return updateResource(resource.id, data);
    createResource(data);
  };

  const createResource = async (data: ResourceValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (!file) {
      return Alert.alert(
        'Error',
        'Debes adjuntar un archivo para subir como recurso',
      );
    }
    const fileDir = file.split('/').pop();
    const type = file.split('.')[file.split('.').length - 1];
    formData.append('pdf', {
      uri: file,
      name: `${fileDir}`,
      type: `file/${type}`,
    } as any);
    formData.append('name', data.name);
    const res = await Http.instance.formData({
      url: `/lessons/${lessonId}/resources`,
      body: formData,
      method: 'POST',
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    refresh();
    reset();
    setFile(null);
    closeModal();
    Alert.alert('Éxito', 'Se ha agregado el recurso a la lección');
  };

  const updateResource = async (id: number, data: ResourceValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (file) {
      const fileDir = file.split('/').pop();
      const type = file.split('.')[file.split('.').length - 1];
      formData.append('file', {
        uri: file,
        name: `${fileDir}`,
        type: `file/${type}`,
      } as any);
    }
    formData.append('name', data.name);
    const res = await Http.instance.formData({
      url: `/lessons/${lessonId}/resources/${id}`,
      body: formData,
      method: 'PUT',
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    refresh();
    reset();
    closeModal();
    Alert.alert('Éxito', 'Se ha actualizado el recurso');
  };

  const handlePress = () => {
    if (lessonId === 0) {
      return Alert.alert(
        'Error',
        'Primero debes crear la lección base con el titulo y descripción',
      );
    }
    setOpen(true);
  };

  const closeModal = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      <Pressable
        style={[
          styles.cardContainer,
          { borderStyle: 'dashed', borderWidth: 3, elevation: 0 },
        ]}
        onPress={handlePress}
        android_ripple={{ color: '' }}
      >
        <Text style={styles.text}>Añadir</Text>
      </Pressable>
      <Modal
        // transparent={true}
        isVisible={open}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        // animationType="slide"
        // onRequestClose={closeModal}
        // statusBarTranslucent
        style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
      >
        <View style={styles.modalOverlay}>
          <View style={ModalStyles.modalContainer}>
            <ScrollView contentContainerStyle={ModalStyles.scrollViewContent}>
              <Text style={ModalStyles.modalTitle}>
                {resource ? 'Actualizar recurso' : 'Agregar recurso'}
              </Text>
              <FilePickerInput
                file={file}
                setFile={setFile}
                label="Adjuntar recurso"
                required
              />
              <ControlledInput
                name="name"
                iconName="check"
                control={control}
                label="Nombre del recurso"
                placeholder="Vocales"
                validations={{ required: 'Se necesita un nombre de recurso' }}
                required
              />
              <View style={{ marginTop: 8 }}>
                <Button
                  text={resource ? 'Actualizar recurso' : 'Crear recurso'}
                  waiting={waiting}
                  onClick={handleSubmit(handleForm)}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateResourceModal;

const styles = StyleSheet.create({
  cardContainer: {
    flexShrink: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    height: 80,
    elevation: 2,
    paddingHorizontal: 18,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  // modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
