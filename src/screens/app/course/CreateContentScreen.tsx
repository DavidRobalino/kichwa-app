// Este código define una pantalla en una aplicación React Native para crear o editar
//  contenido dentro de una lección. Utiliza react-hook-form para manejar formularios
//  y validaciones, y permite agregar, editar o eliminar entradas de contenido, como palabras en dos idiomas.
//  Dependiendo de si hay un glossaryId (identificador de un glosario existente),
//  la pantalla muestra un formulario con datos existentes o un formulario vacío. Al enviar el formulario,
//  se realiza una solicitud HTTP para crear o actualizar el contenido, y el usuario recibe una notificación
//  de éxito o error.
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from 'src/components/common/button/Button';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import WordInput from 'src/components/lesson/content/WordInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useGlossaryById from 'src/hooks/data/useGlossaryById';
import { Http } from 'src/libraries/Http';
import { CreateGlossaryValues } from 'src/models/Glossary.model';
import { CreateContentScreenRouteProps } from 'src/navigation/navigation.types';

const CreateContentScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<CreateContentScreenRouteProps>();
  const { control, reset, handleSubmit, setValue } =
    useForm<CreateGlossaryValues>({
      defaultValues: { title: '', content: [] },
    });
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'content',
  });
  const [waiting, setWaiting] = useState(false);
  const { glossary, loading, error, mutate } = useGlossaryById(
    params.lessonId,
    params.glossaryId,
  );

  const handleForm: SubmitHandler<CreateGlossaryValues> = (data) => {
    console.log('data', data);
    if (params.glossaryId) return updateGlossary(params.glossaryId, data);
    createGlossary(data);
  };

  const createGlossary = async (data: CreateGlossaryValues) => {
    setWaiting(true);
    const res = await Http.instance.post({
      url: `/lessons/${params.lessonId}/contents`,
      body: data,
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    Alert.alert('Éxito', 'Se agrego el nuevo contenido a la lección', [
      {
        text: 'Continuar',
        isPreferred: true,
        style: 'default',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const updateGlossary = async (
    glossaryId: number,
    data: CreateGlossaryValues,
  ) => {
    setWaiting(true);
    const res = await Http.instance.put({
      url: `/lessons/${params.lessonId}/contents/${glossaryId}`,
      body: data,
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    mutate();
    Alert.alert('Éxito', 'Se actualizo el contenido de la lección', [
      {
        text: 'Continuar',
        isPreferred: true,
        style: 'default',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  useEffect(() => {
    if (params.glossaryId) {
      return navigation.setOptions({ title: 'Editar contenido' });
    }
    return navigation.setOptions({ title: 'Nuevo contenido' });
  }, []);

  useEffect(() => {
    if (params.glossaryId && glossary !== undefined) {
      reset({ title: glossary.title, content: glossary.content });
    }
  }, [glossary]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
        >
          <View style={GlobalStyles.body}>
            {params.glossaryId && loading && <Text>Cargando...</Text>}
            {params.glossaryId && !loading && error && (
              <Text>{error.message}</Text>
            )}
            {params.glossaryId && !loading && !error && glossary && (
              <>
                <View
                  style={[
                    GlobalStyles.card,
                    { marginBottom: 12, width: '100%' },
                  ]}
                >
                  <ControlledInput
                    control={control}
                    label="Titulo"
                    name="title"
                    placeholder="Vocales abiertas"
                    validations={{ required: 'Se necesita este campo' }}
                    required
                  />
                </View>
                <Text style={styles.title}>Contenido: </Text>
                {fields.map((field, index) => (
                  <WordInput
                    key={field.id}
                    control={control}
                    name={`content.${index}`}
                    onRemove={() => remove(index)}
                  />
                ))}
                <Button
                  text="Agregar contenido"
                  onClick={() => append({ kichwa: '', spanish: '' })}
                />
              </>
            )}
            {params.glossaryId === undefined && !glossary && (
              <>
                <View
                  style={[
                    GlobalStyles.card,
                    { marginBottom: 12, width: '100%' },
                  ]}
                >
                  <ControlledInput
                    control={control}
                    label="Titulo"
                    name="title"
                    placeholder="Vocales abiertas"
                    validations={{ required: 'Se necesita este campo' }}
                    required
                  />
                </View>
                <Text style={styles.title}>Contenido: </Text>
                {fields.map((field, index) => (
                  <WordInput
                    key={field.id}
                    control={control}
                    name={`content.${index}`}
                    onRemove={() => remove(index)}
                  />
                ))}
                <Button
                  text="Agregar contenido"
                  onClick={() => append({ kichwa: '', spanish: '' })}
                />
              </>
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomCard}>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              onClick={() => navigation.goBack()}
              text="Volver"
              buttonColor={Colors.white}
              textColor={Colors.black}
              borderColor={Colors.gray}
              width={125}
            />
          </View>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              onClick={handleSubmit(handleForm)}
              text={
                params.glossaryId ? 'Actualizar contenido' : 'Crear contenido'
              }
              buttonColor={Colors.accent}
              waiting={waiting}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateContentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
  },
  bottomCard: {
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
});
