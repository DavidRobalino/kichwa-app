// Este código define las pantallas de navegación para la aplicación después de que el usuario 
// haya iniciado sesión. Utiliza createNativeStackNavigator para gestionar la navegación entre 
// diferentes pantallas relacionadas con el curso, las lecciones y las evaluaciones. Cada pantalla 
// tiene configuraciones de estilo personalizadas, como el color del encabezado, el color de la barra 
// de estado y la animación de transición. Además, algunas pantallas específicas (como la de estadísticas,
//  lista de estudiantes y creación de contenido) están configuradas con opciones de diseño consistentes.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Colors } from 'src/constants/Colors';
import CreateContentScreen from 'src/screens/app/course/CreateContentScreen';
import CreateEvaluationScreen from 'src/screens/app/course/CreateEvaluationScreen';
import CreateLessonScreen from 'src/screens/app/course/CreateLessonScreen';
import StudentsListScreen from 'src/screens/app/course/StudentsListScreen';
import ContentLessonScreen from 'src/screens/app/lesson/ContentLessonScreen';
import FeedbackTestScreen from 'src/screens/app/lesson/FeedbackTestScreen';
import LessonScreen from 'src/screens/app/lesson/LessonScreen';
import TestScreen from 'src/screens/app/lesson/TestScreen';
import LessonsScreen from 'src/screens/app/LessonsScreen';
import StatisticsScreen from 'src/screens/app/StatisticsScreen';
import { ScreensNames } from './constants';
import TabsNavigation from './TabsNavigation';
import StudentEvaluationsScreen from 'src/screens/app/course/StudentEvaluationsScreen';

const Stack = createNativeStackNavigator();
// Solo se definen las pantallas o rutas después de haber logeado
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreensNames.app.index}
      screenOptions={{ animation: 'slide_from_right' }}
    >
      <Stack.Screen
        name={ScreensNames.app.statistics}
        component={StatisticsScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Estadísticas',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.studentsList}
        component={StudentsListScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Lista de estudiantes',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.studentEvaluations}
        component={StudentEvaluationsScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Evaluaciones del estudiante',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.lessons}
        component={LessonsScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Curso A',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.lesson}
        component={LessonScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Lección 1',
          headerTintColor: Colors.white,
          headerStyle: { backgroundColor: Colors.primary },
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.test}
        component={TestScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
          // headerTitle: 'Prueba 1',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.feedbackTest}
        component={FeedbackTestScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Resultado prueba 1',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.contentLesson}
        component={ContentLessonScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Vocales',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.createLesson}
        component={CreateLessonScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Nueva lección',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.createTest}
        component={CreateEvaluationScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Nueva evaluación',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.createContent}
        component={CreateContentScreen}
        options={{
          headerShown: true,
          // headerTitle: 'Nuevo contenido',
          headerTintColor: Colors.blackTitle,
          headerStyle: { backgroundColor: Colors.white },
          statusBarStyle: 'dark',
          statusBarAnimation: 'slide',
          statusBarColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={ScreensNames.app.index}
        component={TabsNavigation}
        options={{
          headerShown: false,
          statusBarAnimation: 'slide',
          statusBarStyle: 'light',
          statusBarColor: Colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
