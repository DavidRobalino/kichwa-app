import React from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from 'src/constants/Colors';
import { Http } from 'src/libraries/Http';
import { Resource } from 'src/models/Resource.model';
import { ActionType } from 'src/models/UserInteraction.model';
import { InteractionUtils } from 'src/utils/Interaction.util';
import { PictureUtils } from 'src/utils/Picture.util';

interface ResourceListProps {
  resources: Resource[]; // Lista de archivos
}

const ResourcesList: React.FC<ResourceListProps> = ({ resources }) => {
  return (
    <View style={styles.cardList}>
      {resources.map((resource) => (
        <CardResource key={resource.id} resource={resource} />
      ))}
    </View>
  );
};

// Tipado de props
interface CardResourceProps {
  resource: Resource; // Nombre del archivo que se pasará por props
  canEdit?: boolean;
  refresh?: () => void;
}

export const CardResource: React.FC<CardResourceProps> = ({
  resource,
  canEdit,
  refresh,
}) => {
  // Función para manejar el clic en la tarjeta
  const handlePress = () => {
    Linking.openURL(PictureUtils.getAbsoluteUrl(resource.url));
    InteractionUtils.registerUserInteraction(
      resource.id,
      ActionType.DOWNLOAD_RESOURCE,
    );
  };

  const handleLongPress = () => {
    if (!canEdit) return;
    Alert.alert(
      'Aviso',
      '¿Estas seguro de eliminar este recurso, esta acción es irreversible?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          isPreferred: true,
          style: 'destructive',
          text: 'Eliminar',
          onPress: removeResource,
        },
      ],
    );
  };

  const removeResource = async () => {
    const res = await Http.instance.delete({
      url: `/lessons/${resource.lessonId}/resources/${resource.id}`,
    });
    if (res.statusCode !== 200) {
      return Alert.alert('Error', res.message + '');
    }
    Alert.alert('Éxito', 'Se elimino el recurso');
    if (refresh) refresh();
  };

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={handlePress}
      onLongPress={handleLongPress}
      android_ripple={{ color: '' }}
    >
      <Text style={styles.textPDF}>PDF</Text>
      <Text style={styles.textFile} numberOfLines={2}>
        {resource.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    color: Colors.blackTitle,
  },
  cardList: {
    flexDirection: 'row', // Mostrar los cuadros en una fila
    flexWrap: 'wrap', // Permitir que los cuadros se ajusten en varias filas si es necesario
    justifyContent: 'flex-start',
    gap: 12,
  },
  cardContainer: {
    minWidth: 90,
    maxWidth: 120,
    height: 80,
    backgroundColor: Colors.primaryLight, // Fondo azul
    borderColor: Colors.primary, // Borde azul
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  textPDF: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textFile: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResourcesList;
