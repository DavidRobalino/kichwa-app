// Este código define un componente de React Native que permite a los usuarios unirse a un curso proporcionando 
// un código de curso. Utiliza el hook useForm de react-hook-form para gestionar el formulario y validaciones. 
// Al enviar el formulario, se realiza una solicitud HTTP para unir al usuario al curso, mostrando un mensaje de
//  éxito o error según la respuesta. Además, se gestiona un estado de espera mientras se procesa la solicitud,
//  y se restablece el campo de entrada después de unirse correctamente. El diseño incluye un campo de entrada 
// controlado y un botón de envío.
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Colors } from 'src/constants/Colors';
import { Http } from 'src/libraries/Http';
import Button from '../common/button/Button';
import ControlledInput from '../common/forms/ControlledInput';

interface JoinCourse {
  codeCourse: string;
}

const JoinCourseCard = () => {
  const [waiting, setWaiting] = useState(false);
  const { control, handleSubmit, reset } = useForm<JoinCourse>();

  const joinCourse: SubmitHandler<JoinCourse> = async (data) => {
    console.log(data);
    setWaiting(true);
    const res = await Http.instance.post({
      url: '/courses/join-course',
      body: data,
    });
    if (res.statusCode !== 200) {
      Alert.alert('Error', res.message + '');
      setWaiting(false);
      return;
    }
    Alert.alert('Exito', 'Se unio al curso');
    reset({ codeCourse: '' });
    setWaiting(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Unirse a un curso</Text>
      <ControlledInput
        control={control}
        name="codeCourse"
        label="Código del curso"
        iconName="key"
        placeholder="axserdsa"
        validations={{ required: 'Este codigo del curso es obligatorio' }}
        required
      />
      <View style={styles.button}>
        <Button
          text="Unirse"
          buttonColor={Colors.primary}
          width={'100%'}
          onClick={handleSubmit(joinCourse)}
        />
      </View>
    </View>
  );
};

export default JoinCourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 5, // Bordes redondeados de la tarjeta
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Sombra ligera
    shadowRadius: 4,
    elevation: 3,
    // marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10, // Espacio entre el título y los inputs
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Espacio entre el último input y el botón
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
  },
});
