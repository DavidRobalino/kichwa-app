// El componente SortableLessonsModal permite a los usuarios ordenar las lecciones dentro de un curso 
// mediante una lista ordenable. Al finalizar el reordenamiento, los cambios se envían a un servidor 
// mediante una solicitud PUT para actualizar el orden de las lecciones. También proporciona botones 
// para guardar o cancelar los cambios, y muestra un modal con la interfaz de usuario para ordenar las lecciones.
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { ScrollView } from 'react-native-gesture-handler';
import Button from 'src/components/common/button/Button';
import SortableList, {
  ISortableItem,
} from 'src/components/common/SortableList';
import { ModalStyles } from 'src/components/profile/modals/ModalStyles';
import { Colors } from 'src/constants/Colors';
import { Http } from 'src/libraries/Http';
import { Lesson } from 'src/models/Lesson.model';

interface ISortableLessonsModalProps {
  lessons: Lesson[];
  courseId: number;
  refresh: () => void;
}

const SortableLessonsModal = ({
  courseId,
  lessons,
  refresh,
}: ISortableLessonsModalProps) => {
  const [waiting, setWaiting] = useState(false);
  const [sorted, setSorted] = useState<ISortableItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSortEnd = (sortedData: ISortableItem[]) => {
    setSorted(sortedData);
  };

  const handleSortedLessons = async () => {
    setWaiting(true);
    const body = {
      courseId,
      lessons: sorted.map((lesson, index) => ({
        lessonId: lesson.id,
        order: index + 1,
      })),
    };
    const res = await Http.instance.put({
      url: `/lessons/sort/by-course`,
      body,
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', res.message + '');
    }
    setWaiting(false);
    refresh();
    closeModal();
    Alert.alert('Éxito', 'Se han reordenado las lecciones');
  };

  return (
    <>
      <Text style={styles.orderText} onPress={() => setIsOpen(true)}>
        Ordenar lecciones
      </Text>
      <Modal
        // transparent={true}
        isVisible={isOpen}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        // animationType="slide"
        // onRequestClose={closeModal}
        // statusBarTranslucent
        style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="always"
          >
            <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
              <Text style={[ModalStyles.modalTitle, { marginBottom: 4 }]}>
                Ordenar lecciones
              </Text>
              <SortableList
                data={lessons.map((l) => ({ id: l.id, title: l.title }))}
                onSortEnd={handleSortEnd}
              />
            </View>
          </ScrollView>
          <View style={styles.bottomCard}>
            <View style={{ flexShrink: 1, width: '100%' }}>
              <Button
                onClick={closeModal}
                text="Cancelar"
                buttonColor={Colors.white}
                textColor={Colors.black}
                borderColor={Colors.gray}
                width={125}
              />
            </View>
            <View style={{ flexShrink: 1, width: '100%' }}>
              <Button
                onClick={handleSortedLessons}
                text="Guardar"
                buttonColor={Colors.accent}
                waiting={waiting}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SortableLessonsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
  },
  orderText: {
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  bottomCard: {
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
});
