// Este componente CreateCourseModal gestiona un formulario para crear o editar cursos. Permite agregar
// una imagen, establecer el nombre del curso y decidir si se deben crear lecciones por defecto.
//  Utiliza react-hook-form para manejar el formulario y validaciones. Al enviar el formulario,
// realiza una solicitud HTTP para crear o actualizar el curso, mostrando alertas de éxito o error
// según la respuesta. Además, permite cerrar el modal y restablecer los valores del formulario tras la acción.
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import Button from 'src/components/common/button/Button';
import ControlledCheckbox from 'src/components/common/forms/ControlledCheckbox';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import ImagePickerInput from 'src/components/common/inputs/ImagePickerInput';
import { ModalStyles } from 'src/components/profile/modals/ModalStyles';
import { Http } from 'src/libraries/Http';
import { Course, CourseValues } from 'src/models/Course.model';

interface ICreateCourseProps {
  course?: Course;
  isOpen: boolean;
  close: () => void;
  refresh: () => void;
}

const CreateCourseModal = ({
  course,
  isOpen,
  close,
  refresh,
}: ICreateCourseProps) => {
  const [waiting, setWaiting] = useState(false);
  const [image, setImage] = useState<string | null>(null); // uri -> dirección del recurso en dispositivo
  const { control, handleSubmit, reset } = useForm<CourseValues>({
    defaultValues: course
      ? { name: course.name }
      : { name: '', withDefaultLessons: true },
  });

  const handleForm: SubmitHandler<CourseValues> = (data) => {
    console.log('data', data);
    if (course) return updateCourse(course.id, data);
    createCourse(data);
  };

  const createCourse = async (data: CourseValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (image) {
      // images/galeria/camera/dfasfdasfdsafasdf-fasdfasf-asdfa-fadfasdf.jpeg
      const fileDir = image.split('/').pop();
      const type = image.split('.')[image.split('.').length - 1];
      formData.append('image', {
        uri: image,
        name: `${fileDir}`,
        type: `image/${type}`,
      } as any);
    }
    // formdata -> image : Blob
    formData.append('name', data.name);
    // formdata -> {image: Blob, name: string}
    if (data.withDefaultLessons) {
      formData.append(
        'withDefaultLessons',
        Boolean(data.withDefaultLessons) + '', // "true"
      );
      // formdata -> {image: Blob, name: string, withDefaultLessons: string }
    }
    const res = await Http.instance.formData({
      url: '/courses',
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
    closeModal();
    Alert.alert('Éxito', 'Se ha creado el curso');
  };

  const updateCourse = async (id: number, data: CourseValues) => {
    setWaiting(true);
    const formData = new FormData();
    if (image) {
      const fileDir = image.split('/').pop();
      const type = image.split('.')[image.split('.').length - 1];
      formData.append('image', {
        uri: image,
        name: `${fileDir}`,
        type: `image/${type}`,
      } as any);
    }
    formData.append('name', data.name);
    const res = await Http.instance.formData({
      url: `/courses/${id}`,
      body: formData,
      method: 'PUT',
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    refresh();
    closeModal();
    reset({ name: data.name });
    Alert.alert('Éxito', 'Se ha actualizado el curso');
  };

  const closeModal = () => {
    reset();
    close();
  };

  return (
    <Modal
      // transparent={true}
      isVisible={isOpen}
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
            <Text style={[ModalStyles.modalTitle, { marginBottom: 4 }]}>
              {course ? 'Editar curso' : 'Crear curso'}
            </Text>
            <ImagePickerInput
              image={image}
              setImage={setImage}
              label="Imagen del curso"
            />
            <ControlledInput
              name="name"
              iconName="check"
              control={control}
              label="Nombre del curso"
              placeholder="Séptimo A"
              validations={{ required: 'Se necesita un nombre de curso' }}
              required
            />
            {!course && (
              <ControlledCheckbox
                name="withDefaultLessons"
                control={control}
                label="Crear con lecciones por defecto"
              />
            )}
            <View style={{ marginTop: 8 }}>
              <Button
                text={course ? 'Actualizar curso' : 'Crear curso'}
                waiting={waiting}
                onClick={handleSubmit(handleForm)}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateCourseModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
