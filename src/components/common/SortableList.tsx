// Este componente SortableList permite crear una lista de elementos ordenables mediante arrastre. 
// Utiliza PanResponder para gestionar el movimiento de los elementos y LayoutAnimation para animar los
//  cambios de posición. Los elementos de la lista se pueden reorganizar, y el nuevo orden se pasa a través 
// de la función onSortEnd para notificar el cambio. También se resalta el elemento que está siendo arrastrado
//  y se configura la animación de los elementos durante el proceso.
import React, { useCallback, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

if (
  UIManager.setLayoutAnimationEnabledExperimental &&
  typeof UIManager.setLayoutAnimationEnabledExperimental === 'function'
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ISortableItem {
  id: number;
  title: string;
}

interface SortableListProps {
  data: ISortableItem[];
  onSortEnd: (sortedData: ISortableItem[]) => void;
}

function SortableList({ data, onSortEnd }: SortableListProps) {
  const [items, setItems] = useState(data);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDrag = useCallback(
    (draggedIndex: number, targetIndex: number) => {
      const updatedItems = [...items];
      const [removed] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(targetIndex, 0, removed);
      setItems(updatedItems);
      onSortEnd(updatedItems);
    },
    [items, onSortEnd],
  );

  const createPanResponder = (id: number, index: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDraggingId(id);
      },
      onPanResponderMove: (_, gesture) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const targetIndex = Math.round(
          Math.max(0, Math.min(items.length - 1, gesture.dy / 60 + index)),
        );
        if (targetIndex !== index) {
          handleDrag(index, targetIndex);
        }
      },
      onPanResponderRelease: () => {
        setDraggingId(null);
      },
    });
  };

  return (
    <View style={styles.list}>
      {items.map((item, index) => {
        const panResponder = createPanResponder(item.id, index);
        const isDragging = draggingId === item.id;
        return (
          <Animated.View
            key={item.id}
            {...panResponder.panHandlers}
            style={[
              styles.item,
              isDragging && styles.draggingItem, // Highlight dragged item
            ]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.handle}>
              <Text style={styles.handleText}>☰</Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Title on left, handle on right
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  draggingItem: {
    backgroundColor: '#FFD700', // Highlight color for dragged item
    elevation: 5, // Add shadow for better visual feedback
  },
  handle: {
    marginRight: 10,
    padding: 5,
  },
  handleText: {
    fontSize: 20,
    color: '#555',
  },
  title: {
    fontSize: 16,
  },
});

export default SortableList;
