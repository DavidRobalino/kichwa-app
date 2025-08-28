// Este código define las pantallas de navegación para la aplicación antes de que el usuario
//  inicie sesión. Utiliza createNativeStackNavigator para gestionar las pantallas públicas
//  como la pantalla de bienvenida, inicio de sesión, registro y una pantalla de introducción (Splash).
//  Cada pantalla tiene configuraciones personalizadas para el encabezado (desactivado en todas las pantallas) 
// y la barra de estado (con colores y animaciones específicas).
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Colors } from 'src/constants/Colors';
import WelcomeScreen from 'src/screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { ScreensNames } from './constants';
import SplashScreen from 'src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
// Solo se definen las pantallas publicas o no iniciado sesion
const PublicStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreensNames.splash}
      screenOptions={{ animation: 'slide_from_right' }}
    >
      <Stack.Screen
        name={ScreensNames.splash}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreensNames.auth.welcome}
        component={WelcomeScreen}
        options={{
          headerShown: false,
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primaryDark,
        }}
      />
      <Stack.Screen
        name={ScreensNames.auth.login}
        component={LoginScreen}
        options={{
          headerShown: false,
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primaryDark,
        }}
      />
      <Stack.Screen
        name={ScreensNames.auth.register}
        component={RegisterScreen}
        options={{
          headerShown: false,
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primaryDark,
        }}
      />
    </Stack.Navigator>
  );
};

export default PublicStack;
