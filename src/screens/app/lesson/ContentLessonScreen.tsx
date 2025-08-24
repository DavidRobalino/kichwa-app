// Componente ContentLessonScreen que muestra el contenido de un glosario específico de una lección. 
// Al cargar, registra una interacción del usuario con el glosario. 
// Muestra un listado de palabras con sus traducciones (Kichwa y Español) y gestiona estados de carga y error.
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from 'src/constants/Colors';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useGlossaryById from 'src/hooks/data/useGlossaryById';
import { IGlossaryContent } from 'src/models/Glossary.model';
import { ActionType } from 'src/models/UserInteraction.model';
import {
  ContentScreenRouteProps,
  LessonScreenNavigationProps,
} from 'src/navigation/navigation.types';
import { InteractionUtils } from 'src/utils/Interaction.util';

const ContentLessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProps>();
  const { params } = useRoute<ContentScreenRouteProps>();
  const { glossary, loading, error } = useGlossaryById(
    params.lessonId,
    params.glossaryId,
  );

  useEffect(() => {
    navigation.setOptions({ title: params.title });
  }, []);

  useEffect(() => {
    const tout = setTimeout(() => {
      InteractionUtils.registerUserInteraction(
        params.glossaryId,
        ActionType.VIEW_GLOSSARY,
      );
    }, InteractionUtils.MIN_TIMEOUT_TIME);

    return () => {
      if (tout) clearTimeout(tout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={[GlobalStyles.body, { rowGap: 16 }]}>
          {loading && <Text>cargando...</Text>}
          {!loading && error && <Text>{error.message}</Text>}
          {!loading &&
            !error &&
            glossary &&
            glossary.content.map((content, index) => (
              <WordCard key={index} content={content} />
            ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentLessonScreen;

const WordCard = ({ content }: { content: IGlossaryContent }) => {
  return (
    <View
      style={[
        GlobalStyles.card,
        { width: '100%', padding: 0, overflow: 'hidden' },
      ]}
    >
      <View
        style={{
          backgroundColor: Colors.greenLight,
          padding: 10,
        }}
      >
        <Text style={[styles.baseText, styles.bold]}>Kichwa</Text>
        <Text style={styles.baseText}>{content.kichwa}</Text>
      </View>
      {/*  <View style={styles.divider} /> */}
      <View
        style={{
          backgroundColor: Colors.primaryLight,
          padding: 10,
        }}
      >
        <Text style={[styles.baseText, styles.bold]}>Español</Text>
        <Text style={styles.baseText}>{content.spanish}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  baseText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.gray,
    marginVertical: 2,
  },
});
