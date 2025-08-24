// Componente de pantalla de bienvenida para una aplicación de aprendizaje de Kichwa.
// Muestra un título, una imagen, y botones para navegar a las pantallas de inicio de sesión y registro.
// Utiliza react-navigation para manejar la navegación y react-native-svg para mostrar gráficos decorativos.
// SafeAreaView asegura que los elementos no se superpongan con la barra de estado o notch del dispositivo.
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import Button from 'src/components/common/button/Button';
import { Colors } from 'src/constants/Colors';
import { WelcomeWaves } from 'src/constants/SvgImages';
import { ScreensNames } from 'src/navigation/constants';

const WelcomeScreen = () => {
  // usamos un hook para obtener una instancia de la navegación
  const navigation = useNavigation();

  return (
    // el componente SafeAreaView previene que los componentes se renderizen fuera del viewport (status bar, notch, navigation bar, etc.)
    <SafeAreaView style={styles.safeArea}>
      {/* importamos y usamos las ondas de la parte superior de la pantalla */}
      <SvgXml xml={WelcomeWaves} style={styles.bgPattern} />
      {/* contenedor del contenido */}
      <View style={styles.container}>
        {/* TODO: change this image */}
        <Image
          style={styles.stretch}
          source={require('../../../assets/lengua.png')}
        />
        <Text style={styles.title}>
          <Text>Aprende Kichwa</Text>
          <Text>{'\n'}</Text>
          <Text>con nosotros</Text>
        </Text>
        {/* botón para cambiar de pantalla (go to LOGIN) */}
        <Button
          text="Iniciar Ahora"
          onClick={() => navigation.navigate(ScreensNames.auth.login as never)}
        />
        <View style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.text}>¿Aún no tienes cuenta?</Text>
          {/* botón para cambiar de pantalla (go to REGISTER) */}
          <View style={styles.registerContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate(ScreensNames.auth.register as never)
              }
            >
              <Text style={styles.registerText}>Regístrate</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative', // indicamos que la posición del contenedor padre es relativo
  },
  // ubicamos las waves en la parte superior de la pantalla
  bgPattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -4,
  },
  container: {
    flex: 1, // Para que el contenedor ocupe todo el espacio disponible
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  stretch: {
    width: 325,
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    marginVertical: 8,
    textAlign: 'center',
    color: Colors.blackTitle,
  },
  row: {
    flexDirection: 'row', // Alinea los textos en una fila
    alignItems: 'center', // Alinea verticalmente los textos y el contenedor
  },
  text: {
    fontSize: 20,
    marginRight: 10, // Espacio entre los textos
  },
  registerContainer: {
    alignItems: 'center', // Centrar el texto y la línea
  },
  registerText: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  underline: {
    marginTop: 1, // Espacio entre el texto y la línea
    width: '100%', // O ajustar al tamaño que desees
    height: 1, // Altura de la línea
    backgroundColor: Colors.primary,
  },
});

export default WelcomeScreen;
