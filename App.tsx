// Este código configura la estructura principal de mi aplicación en React Native. Uso SafeAreaProvider 
// para manejar áreas seguras en diferentes dispositivos, MenuProvider para menús emergentes y NavigationContainer 
// para la navegación. MainStack define las pantallas principales de la app. También incluyo StatusBar para controlar
//  la barra de estado.
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainStack from 'src/navigation/MainStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
