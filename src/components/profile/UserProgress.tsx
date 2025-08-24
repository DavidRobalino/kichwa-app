// Este código define un componente 'UserProgress' que muestra el progreso del usuario en varias áreas como lecciones, evaluaciones, contenidos y documentos. 
// Los datos de progreso se obtienen a través del hook 'useStudentProgress', y se actualizan automáticamente al enfocar la pantalla gracias al 'useFocusEffect'. 
// El componente presenta esta información en un diseño de cuadrícula con imágenes representativas para cada categoría y el número correspondiente de elementos (o un mensaje de carga o error). 
// Se aplica un estilo con sombras y bordes redondeados a las imágenes y las celdas de información.
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'src/constants/Colors';
import useStudentProgress from 'src/hooks/data/useStudentProgress';

const UserProgress = () => {
  const { studentProgress, loading, error, mutate } = useStudentProgress();

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Tú progreso</Text>
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/statics/level.png')}
                  style={styles.image}
                />
              </View>
              <Text>Lecciones</Text>
              <Text>
                {loading ? '...' : error ? '0' : studentProgress?.lessons}
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/statics/evaluation.png')}
                  style={styles.image}
                />
              </View>
              <Text>Evaluaciones</Text>
              <Text>
                {loading ? '...' : error ? '0' : studentProgress?.evaluations}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/statics/class.png')}
                  style={styles.image}
                />
              </View>
              <Text>Contenidos</Text>
              <Text>
                {loading ? '...' : error ? '0' : studentProgress?.glossaries}
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/statics/document.png')}
                  style={styles.image}
                />
              </View>
              <Text>Documentos</Text>
              <Text>
                {loading ? '...' : error ? '0' : studentProgress?.resources}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProgress;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 90, // Dimensiones del contenedor
    height: 90,
    borderRadius: 50, // Hace el contenedor circular
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Asegura que la imagen no se salga del borde redondeado
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'stretch',
  },
});
