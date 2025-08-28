// El componente CreateOrUpdateLesson se encarga de la creación o actualización de una lección, 
// permitiendo al usuario añadir o modificar su título, descripción, imagen y contenido. Además, 
// ofrece la opción de crear o actualizar la evaluación asociada a la lección. Muestra los recursos
//  y glosarios de la lección, y permite agregar nuevos contenidos o eliminar los existentes.
// También maneja la navegación hacia pantallas para crear contenido o evaluación.
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Control } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from 'src/components/common/button/Button';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import ImagePickerInput from 'src/components/common/inputs/ImagePickerInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import { Lesson } from 'src/models/Lesson.model';
import { ScreensNames } from 'src/navigation/constants';
import { CreateLessonNavigationProps } from 'src/navigation/navigation.types';
import { CardResource } from '../ResourcesList';
import { Glossary } from 'src/models/Glossary.model';
import { Http } from 'src/libraries/Http';
import CreateResourceModal from '../resource/CreateResourceModal';

interface ICreateOrUpdateLessonProps {
  lesson?: Lesson;
  image: string | null;
  setImage: (v: string | null) => void;
  control: Control<any>;
  refresh: () => void;
}

const CreateOrUpdateLesson = ({
  control,
  image,
  lesson,
  setImage,
  refresh,
}: ICreateOrUpdateLessonProps) => {
  const navigation = useNavigation<CreateLessonNavigationProps>();

  const handleCreateContent = () => {
    if (!lesson) {
      return Alert.alert(
        'Error',
        'Primero debes crear la lección base con el titulo y descripción',
      );
    }
    navigation.navigate(ScreensNames.app.createContent as 'create-content', {
      lessonId: lesson.id,
    });
  };

  const handleCreateEvaluation = () => {
    if (!lesson) {
      return Alert.alert(
        'Error',
        'Primero debes crear la lección base con el titulo y descripción',
      );
    }
    navigation.navigate(ScreensNames.app.createTest as 'create-test', {
      lessonId: lesson.id,
      evaluationId: lesson.evaluations[0]?.id,
    });
  };

  return (
    <View style={GlobalStyles.body}>
      <ImagePickerInput
        image={image}
        setImage={setImage}
        label="Imagen de la lección"
        aspect={[1, 1]}
        required
      />
      <ControlledInput
        control={control}
        name="title"
        label="Título de la lección"
        placeholder="Vocales"
        required
      />
      <ControlledInput
        control={control}
        name="description"
        label="Introducción"
        placeholder="En esta lección..."
        multiline
        required
      />
      <Text style={styles.label}>Contenido:</Text>
      <View style={styles.wrapRow}>
        {lesson?.glossaries.map((glossary) => (
          <ContentCard
            key={glossary.id}
            glossary={glossary}
            refresh={refresh}
          />
        ))}
        <AddContent onPress={handleCreateContent} />
      </View>
      <Text style={styles.label}>Recursos:</Text>
      <View style={styles.wrapRow}>
        {lesson?.resources.map((resource) => (
          <CardResource
            key={resource.id}
            resource={resource}
            refresh={refresh}
            canEdit
          />
        ))}
        <CreateResourceModal lessonId={lesson?.id || 0} refresh={refresh} />
      </View>
      <Text style={styles.label}>Evaluación:</Text>
      {(!lesson || lesson?.evaluations.length === 0) && (
        <Text style={[styles.label, { fontWeight: '400', marginTop: 0 }]}>
          Esta lección no tiene asignada una evaluación
        </Text>
      )}
      {lesson && lesson.evaluations.length > 0 && (
        <Text style={[styles.label, { fontWeight: '400', marginTop: 0 }]}>
          <Text>Esta evaluación tiene</Text>
          <Text> {lesson.evaluations[0].questions.length} </Text>
          <Text>preguntas</Text>
        </Text>
      )}
      <Button
        text={
          lesson?.evaluations.length === 0
            ? 'Crear evaluación'
            : 'Actualizar evaluación'
        }
        buttonColor={Colors.accent}
        onClick={handleCreateEvaluation}
      />
    </View>
  );
};

export default CreateOrUpdateLesson;

interface IContentCardProps {
  glossary: Glossary;
  refresh: () => void;
}

const ContentCard = ({ glossary, refresh }: IContentCardProps) => {
  const navigation = useNavigation<CreateLessonNavigationProps>();

  const handleLongPress = () => {
    Alert.alert(
      'Aviso',
      '¿Estas seguro de eliminar este contenido, esta acción es irreversible?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          isPreferred: true,
          style: 'destructive',
          text: 'Eliminar',
          onPress: removeContent,
        },
      ],
    );
  };

  const removeContent = async () => {
    const res = await Http.instance.delete({
      url: `/lessons/${glossary.lessonId}/contents/${glossary.id}`,
    });
    if (res.statusCode !== 200) {
      return Alert.alert('Error', res.message + '');
    }
    Alert.alert('Éxito', 'Se elimino el contenido');
    refresh();
  };

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate(
          ScreensNames.app.createContent as 'create-content',
          { lessonId: glossary.lessonId, glossaryId: glossary.id },
        )
      }
      onLongPress={handleLongPress}
      android_ripple={{ color: '' }}
    >
      <Text style={styles.text}>{glossary.title}</Text>
    </Pressable>
  );
};

const AddContent = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable
      style={[
        styles.cardContainer,
        { borderStyle: 'dashed', borderWidth: 3, elevation: 0 },
      ]}
      onPress={onPress}
      android_ripple={{ color: '' }}
    >
      <Text style={styles.text}>Añadir</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 8,
    fontSize: 16,
    marginBottom: 8,
    color: Colors.blackTitle,
    fontWeight: '500',
  },
  //
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  // content
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
});
