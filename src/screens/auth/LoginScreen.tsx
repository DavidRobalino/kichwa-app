// Este código define una pantalla de inicio de sesión en una aplicación móvil desarrollada con
//  React Native. Usa react-hook-form para gestionar el formulario de autenticación y react-navigation
//  para manejar la navegación. La pantalla incluye un formulario con campos controlados para ingresar
//  el correo y la contraseña, además de un botón para enviar los datos a un endpoint de autenticación (/auth/login).
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import Button from 'src/components/common/button/Button';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import ControlledPasswordInput from 'src/components/common/forms/ControlledPasswordInput';
import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import { WelcomeWaves } from 'src/constants/SvgImages';
import { Http } from 'src/libraries/Http';
import { ScreensNames } from 'src/navigation/constants';

type TLoginValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  // usamos un hook para obtener una instancia de la navegación
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm<TLoginValues>({
    defaultValues: { email: '', password: '' },
  });
  const [waiting, setWaiting] = useState(false);

  const handleLogin: SubmitHandler<TLoginValues> = async (data) => {
    setWaiting(true);
    const values = { email: data.email.toLowerCase(), password: data.password };
    const res = await Http.instance.post({ url: '/auth/login', body: values });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    navigation.navigate(ScreensNames.splash as never);
    // navigation.navigate(ScreensNames.app.index as never);
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
              <Text style={{ fontWeight: '700' }}>Iniciar </Text>
              <Text>Sesión</Text>
            </Text>
            <ControlledInput
              control={control}
              name="email"
              validations={{ required: 'Se necesita el correo electrónico' }}
              label="Correo electrónico"
              iconName="mail"
              placeholder="pepito@gmail.com"
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
            <View style={styles.button}>
              <Button
                text="Ingresar"
                waiting={waiting}
                onClick={handleSubmit(handleLogin)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    width: 200,
    height: 140,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 26,
    textAlign: 'left',
    marginBottom: 12, // Espacio entre el título y los inputs
  },
  button: {
    marginTop: 16,
  },
});
