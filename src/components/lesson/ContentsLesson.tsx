// Este código define un componente que muestra una lista de "glosarios" organizados en filas, donde cada 
// fila contiene hasta dos elementos. Los glosarios están representados como tarjetas clicables que, al ser
//  presionadas, redirigen a una pantalla de contenido detallado. Además, las tarjetas están dispuestas de forma 
// alternada en filas y se acompañan de flechas para indicar dirección. La disposición de los glosarios se gestiona 
// con una estructura de cuadrícula que organiza el contenido de manera visualmente atractiva.
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería de íconos

import { Colors } from 'src/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ScreensNames } from 'src/navigation/constants';
import { Glossary } from 'src/models/Glossary.model';
import { LessonScreenNavigationProps } from 'src/navigation/navigation.types';

// Tipado de props
interface CardContentProps {
  glossaries: Glossary[];
}

const ContentsLesson: React.FC<CardContentProps> = ({ glossaries }) => {
  // agrupamos la información en un array de arrays
  const contents = useMemo(() => {
    const result: Glossary[][] = [];
    for (let i = 0; i < glossaries.length; i += 2) {
      result.push(glossaries.slice(i, i + 2));
    }
    return result;
  }, [glossaries]);

  return (
    <View style={styles.grid}>
      {contents.map((data, index) => (
        <GridRow
          key={index}
          data={data}
          index={index + 1}
          isLast={index === contents.length - 1}
        />
      ))}
    </View>
  );
};

export default ContentsLesson;

interface IGridRowProps {
  data: Glossary[];
  index: number;
  isLast: boolean;
}

const GridRow = ({ data, index, isLast }: IGridRowProps) => {
  return (
    <>
      <View
        style={[
          styles.row,
          { flexDirection: index % 2 === 0 ? 'row-reverse' : 'row' },
        ]}
      >
        <View style={styles.col2}>
          <ContentCard content={data[0]} />
        </View>
        <View style={styles.col1}>
          {data[1] && (
            <AntDesign
              name={index % 2 === 0 ? 'arrowleft' : 'arrowright'}
              size={24}
              color="black"
              accessibilityLabel={
                index % 2 === 0 ? 'Arrow left icon' : 'Arrow right icon'
              }
            />
          )}
        </View>
        <View style={styles.col2}>
          {data[1] && <ContentCard content={data[1]} />}
        </View>
      </View>
      {!isLast && (
        <View
          style={[
            styles.row,
            { flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' },
          ]}
        >
          <View style={styles.col2}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <AntDesign
                name="arrowdown"
                size={24}
                color="black"
                accessibilityLabel="Arrow down icon"
              />
            </View>
          </View>
          <View style={styles.col1}></View>
          <View style={styles.col2}></View>
        </View>
      )}
    </>
  );
};

const ContentCard = ({ content }: { content: Glossary }) => {
  const navigation = useNavigation<LessonScreenNavigationProps>();

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate(ScreensNames.app.contentLesson as 'content', {
          glossaryId: content.id,
          lessonId: content.lessonId,
          title: content.title,
        })
      }
      android_ripple={{ color: '' }}
    >
      <Text style={styles.text}>{content.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  grid: {
    flex: 5,
    marginHorizontal: 'auto',
    width: '100%',
    rowGap: 8,
  },
  row: {
    alignItems: 'center',
  },
  col1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col2: {
    flex: 2,
  },
  cardContainer: {
    flexShrink: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    height: 80,
    elevation: 2,
  },
});
