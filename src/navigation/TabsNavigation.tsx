// Este código define la navegación de pestañas en la aplicación utilizando createBottomTabNavigator
// de React Navigation. Incluye dos pantallas principales: "Home" y "Account". Cada pestaña tiene un
// ícono de AntDesign y un texto de etiqueta. Además, se personalizan los colores y estilos de las pestañas,
//  como los colores activos e inactivos y el estilo de la etiqueta. La pantalla "Home" tiene un encabezado
// personalizado, mientras que "Account" no muestra encabezado.
import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Colors } from 'src/constants/Colors';
import AccountScreen from '../screens/app/AccountScreen';
import HomeScreen from '../screens/app/HomeScreen';
import { ScreensNames } from './constants';

const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      initialRouteName={ScreensNames.app.home}
      safeAreaInsets={{ bottom: 5, top: 5 }}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
      }}
    >
      <Tabs.Screen
        name={ScreensNames.app.home}
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Inicio',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name={ScreensNames.app.account}
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
