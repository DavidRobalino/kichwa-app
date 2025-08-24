// Este código define un componente 'UserBadges' que muestra un conjunto de insignias obtenidas por el usuario según su progreso en el aprendizaje.
// Las insignias son visualizadas como imágenes con un texto que describe el logro. Al tocar una insignia, se muestra una alerta informando si
// el usuario ha desbloqueado la insignia (basado en su desempeño) o si aún está bloqueada.
// El estado de las insignias se obtiene mediante el hook 'useStudentBadges' y se actualiza automáticamente al enfocar la pantalla gracias al 'useFocusEffect'.
import { useFocusEffect } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Colors } from 'src/constants/Colors';
import useStudentBadges from 'src/hooks/data/useStudentBadges';

const UserBadges = () => {
  const { studentBadges, loading, error, mutate } = useStudentBadges();

  const count = useMemo(() => {
    return {
      lessons: studentBadges?.lessons || 0,
      evaluations: studentBadges?.evaluations || 0,
      evaluationsPerfectScore: studentBadges?.evaluationsPerfectScore || 0,
    };
  }, [studentBadges]);

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Tus insignias</Text>
        <View style={styles.imagesGrid}>
          <View style={styles.imageRow}>
            {/* Primera insignia */}
            <TouchableOpacity
              onPress={() => {
                if (count.lessons > 10) {
                  Alert.alert(
                    '🏆 Insignia Desbloqueada: "Subir rápido"',
                    '¡Increíble! Has completado más de 10 lecciones y estás avanzando a toda velocidad en tu aprendizaje. 🚀 Sigue así y conviértete en un experto.',
                  );
                } else {
                  Alert.alert(
                    '🔒 Insignia Bloqueada',
                    'Para desbloquear la insignia "Subir rápido", debes completar más de 10 lecciones. ¡Sigue aprendiendo y lo lograrás! 📚✨',
                  );
                }
              }}
            >
              <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../../assets/statics/turtle.png')}
                    style={[
                      styles.image,
                      {
                        opacity:
                          loading || error ? 0.6 : count.lessons > 10 ? 1 : 0.6,
                      },
                    ]}
                  />
                </View>
                <Text>Subir rápido</Text>
              </View>
            </TouchableOpacity>
            {/* Segunda insignia */}
            <TouchableOpacity
              onPress={() => {
                if (count.evaluations > 2) {
                  Alert.alert(
                    '🏆 Insignia Desbloqueada: "El rápido"',
                    '¡Felicidades! Has aprobado más de 2 evaluaciones distintas, demostrando tu velocidad y precisión en el aprendizaje. 🚀',
                  );
                } else {
                  Alert.alert(
                    '🔒 Insignia Bloqueada',
                    'Para desbloquear la insignia "El rápido", debes aprobar más de 2 evaluaciones diferentes. ¡Sigue practicando! 💪',
                  );
                }
              }}
            >
              <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../../assets/statics/mas-rapido.png')}
                    style={[
                      styles.image,
                      {
                        opacity:
                          loading || error
                            ? 0.6
                            : count.evaluations > 2
                            ? 1
                            : 0.6,
                      },
                    ]}
                  />
                </View>
                <Text>El rápido</Text>
              </View>
            </TouchableOpacity>
            {/* Tercera insignia */}
            <TouchableOpacity
              onPress={() => {
                if (Number(count.evaluationsPerfectScore) >= 1) {
                  Alert.alert(
                    '🏆 Insignia Desbloqueada: "Todo OK"',
                    '¡Genial! Has logrado una evaluación con la puntuación perfecta. 🎯 Sigue demostrando tu precisión y excelencia en cada desafío.',
                  );
                } else {
                  Alert.alert(
                    '🔒 Insignia Bloqueada',
                    'Para desbloquear la insignia "Todo OK", debes obtener una puntuación perfecta en al menos una evaluación. ¡Sigue esforzándote, tú puedes! 💪',
                  );
                }
              }}
            >
              <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../../assets/statics/oso.png')}
                    style={[
                      styles.image,
                      {
                        opacity:
                          loading || error
                            ? 0.6
                            : Number(count.evaluationsPerfectScore) >= 1
                            ? 1
                            : 0.6,
                      },
                    ]}
                  />
                </View>
                <Text>Todo OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserBadges;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    // marginTop: 16,
    // alignItems: 'center', // Centra horizontalmente
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
    // width: '90%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagesGrid: {
    width: '100%',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 80, // Dimensiones del contenedor
    height: 80,
    borderRadius: 40, // Hace el contenedor circular
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
    width: 60,
    height: 60,
    resizeMode: 'stretch',
  },
});
