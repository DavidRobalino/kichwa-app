// Este componente `RegisterScreen` es una pantalla de registro de usuario en una aplicación 
// desarrollada con React Native. Utiliza `react-hook-form` para gestionar el formulario 
// y `react-navigation` para la navegación. Permite a los usuarios ingresar su información 
// (nombre, apellido, nombre de usuario, correo, contraseña) y seleccionar si son docentes. 
// Al enviar el formulario, se envían los datos a un endpoint de registro (`/auth/register`) 
// mediante una solicitud HTTP. Además, se implementan medidas de UX como `SafeAreaView`, 
// `KeyboardAvoidingView` y `ScrollView` para mejorar la experiencia del usuario en 
// dispositivos móviles.
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import Button from 'src/components/common/button/Button';
import ControlledCheckbox from 'src/components/common/forms/ControlledCheckbox';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import ControlledPasswordInput from 'src/components/common/forms/ControlledPasswordInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import { WelcomeWaves } from 'src/constants/SvgImages';
import { Http } from 'src/libraries/Http';
import { UserValues } from 'src/models/User.model';

const RegisterScreen = () => {
  // usamos un hook para obtener una instancia de la navegación
  const navigation = useNavigation();
  const { control, handleSubmit, reset } = useForm<UserValues>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      isTeacher: false,
      lastName: '',
    },
  });
  const [waiting, setWaiting] = useState(false);

  const createAccount: SubmitHandler<UserValues> = async (data) => {
    setWaiting(true);
    data.email = data.email.toLowerCase();
    const res = await Http.instance.post({ url: '/auth/register', body: data });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    Alert.alert('Éxito', 'Cuenta de usuario creada con éxito', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
    reset();
  };

  return (
    // el componente SafeAreaView previene que los componentes se renderizen fuera del viewport (status bar, notch, navigation bar, etc.)
    <SafeAreaView style={styles.safeArea}>
      {/* importamos y usamos las ondas de la parte superior de la pantalla */}
      <SvgXml xml={WelcomeWaves} style={styles.bgPattern} />
      {/* usamos el componente KeyboardAvoidingView para evitar que el teclado se superponga sobre el contenido de la pantalla (por cuestiones de UX) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* agregamos un ScrollView a la pantalla para evitar que cuando aparezca el teclado del dispositivo no pueda acceder a todos los campos del formulario */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.stretch}
              source={require('../../../assets/logoApp.jpg')}
            />
          </View>
          <View style={GlobalStyles.card}>
            <Text style={styles.cardTitle}>
              <Text style={{ fontWeight: '700' }}>Registrar </Text>
              <Text>Usuario</Text>
            </Text>
            <ControlledInput
              control={control}
              name="firstName"
              validations={{ require: 'Se necesita el nombre del usuario' }}
              label="Nombre"
              iconName="user"
              placeholder="Juanito"
              required
            />
            <ControlledInput
              control={control}
              name="lastName"
              validations={{ require: 'Se necesita el apellido usuario' }}
              label="Apellido"
              iconName="user"
              placeholder="Romero"
              required
            />
            <ControlledInput
              control={control}
              name="username"
              validations={{ require: 'Se necesita el nombre de usuario' }}
              label="Nombre de usuario"
              iconName="aliwangwang-o1"
              placeholder="juanito99"
              required
            />
            <ControlledInput
              control={control}
              name="email"
              validations={{ require: 'Se necesita el correo' }}
              label="Correo electrónico"
              iconName="mail"
              placeholder="juanito@gmail.com"
              keyboardType="email-address"
              required
            />
            <ControlledPasswordInput
              control={control}
              name="password"
              validations={{ required: 'Se necesita la contraseña' }}
              label="Contraseña"
              iconName="lock"
              required
            />
            <View style={{ marginTop: 8 }}>
              <ControlledCheckbox
                label="¿Es usted docente?"
                control={control}
                name="isTeacher"
                defaultValue={false}
              />
            </View>
            <View style={styles.button}>
              <Button
                text="Registrarse"
                waiting={waiting}
                onClick={handleSubmit(createAccount)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  bgPattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -4,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centra verticalmente el contenido
    paddingVertical: 50, // Espacio superior e inferior
  },
  logoContainer: {
    marginBottom: 30, // Espacio entre el logo y la tarjeta
  },
  stretch: {
    width: 160,
    height: 120,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 26,
    textAlign: 'left',
    marginBottom: 12, // Espacio entre el título y los inputs
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
    marginTop: 16,
  },
});
