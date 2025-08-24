// Este componente FloatingActionButton crea un botón flotante que al presionarse expande un conjunto de
// botones adicionales con animaciones. Los botones adicionales están animados para aparecer y moverse
// hacia arriba con una transición. El botón principal, representado por un ícono de "+" al centro, rota
//  y se mueve cuando el conjunto de botones adicionales se despliega. Cada botón adicional tiene una
// acción asignada que se ejecuta cuando se presiona. Las animaciones están controladas usando
//  react-native-reanimated.
import React from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from 'src/constants/Colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 50;

interface FloatingActionButtonProps {
  actions: {
    label: string;
    src: string;
    onPress: () => void;
  }[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions,
}) => {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';
    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.shadow, mainButtonStyles.button]}
          >
            <Animated.Text style={[mainButtonStyles.content, plusIconStyle]}>
              +
            </Animated.Text>
          </AnimatedPressable>
          {actions.map((action, index) => (
            <FloatingActionButtonItem
              key={index}
              isExpanded={isExpanded}
              index={index + 1}
              label={action.label}
              imageSource={action.src}
              onPress={() => {
                handlePress();
                action.onPress();
              }} // Asignar la acción al botón
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

interface FloatingActionButtonItemProps {
  isExpanded: SharedValue<boolean>;
  index: number;
  label: string;
  imageSource: any;
  onPress: () => void; // Acción que se ejecuta cuando se presiona
}

const FloatingActionButtonItem: React.FC<FloatingActionButtonItemProps> = ({
  isExpanded,
  index,
  imageSource,
  label,
  onPress, // Nueva prop para la acción
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        { scale: withDelay(delay, withTiming(scaleValue)) },
      ],
    };
  });

  const textAnimatedStyles = useAnimatedStyle(() => {
    const translateValue = withSpring(0, SPRING_CONFIG);
    const delay = 200;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        { scale: withDelay(delay, withTiming(scaleValue)) },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.shadow, styles.buttonFab]}
      onPress={onPress} // Ejecutar la acción cuando se presione el botón
    >
      <Animated.Text
        style={[
          textAnimatedStyles,
          { fontSize: 16, fontWeight: '700', color: Colors.white },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={styles.containerIcon}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </AnimatedPressable>
  );
};

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 10,
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 30,
    color: Colors.white,
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonFab: {
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: -30,
    display: 'flex',
    // paddingRight: 16,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 6,
    borderRadius: 60,
    paddingLeft: 14,
    // paddingHorizontal: 4,
    zIndex: 1,
  },
  containerIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shadow: {
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default FloatingActionButton;
