// Este código define un conjunto de estilos globales utilizando StyleSheet de React Native. 
// Se crean estilos para una tarjeta (card) con fondo blanco, bordes redondeados, sombra y un tamaño específico,
//  y para el cuerpo (body) con padding horizontal y vertical. Los estilos también incluyen propiedades para la
//  sombra tanto en iOS como en Android.
import { StyleSheet } from 'react-native';

import { Colors } from './Colors';

export const GlobalStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 10, // Bordes redondeados de la tarjeta
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Sombra ligera
    shadowRadius: 4,
    elevation: 3, // Para Android, sombra más prominente
  },
  body: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
