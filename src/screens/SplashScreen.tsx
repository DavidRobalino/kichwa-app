// Este código maneja la pantalla de carga (SplashScreen) de la app. Verifica si hay una sesión activa,
// redirige al usuario según su estado (autenticado, sin cuenta o bloqueado) y muestra una pantalla de
// carga mientras se procesa la información.
import { CommonActions, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from 'src/constants/Colors';

import useProfile from 'src/hooks/data/useProfile';
import { Http } from 'src/libraries/Http';
import { ACCESS_TOKEN } from 'src/libraries/Http/axios-config.utils';
import { Storage } from 'src/libraries/Storage';
import { ScreensNames } from 'src/navigation/constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { cleanProfile, mutate, loading, error, me } = useProfile();

  const verifySession = async () => {
    const token = await Storage.instance.get({ key: ACCESS_TOKEN });
    if (!token) return noAuthUser();
    mutate();
  };

  const noAuthUser = () => {
    console.log('NO HAY TOKEN');
    cleanProfile();
    navigation.navigate(ScreensNames.auth.welcome as never);
  };

  // TODO: refactor to unique method
  const logout = async () => {
    const res = await Http.instance.post({ url: '/auth/logout' });
    if (res.statusCode !== 200) {
      return Alert.alert('Error al cerrar sesión');
    }
    cleanProfile();
    verifySession();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('VERIFY SESSION');
      verifySession();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('RESET SCREEN');
      navigation.dispatch((state) => {
        // Remove the splash route from the stack
        const routes = state.routes.filter(
          (r) => r.name !== ScreensNames.splash,
        );
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log('HAY ERROR');
        navigation.navigate(ScreensNames.auth.welcome as never);
      } else if (!me?.firstName) {
        console.log('NO HAY USER');
        navigation.navigate(ScreensNames.auth.welcome as never);
      } else {
        // check if user is active
        if (!me.isActive) {
          return Alert.alert(
            'Advertencia',
            'Tu cuenta ha sido bloqueada, contacta con nuestro equipo',
          );
        }
        console.log('ALL CORRECTO :D');
        navigation.navigate(ScreensNames.app.index as never);
      }
    }
  }, [loading, error]);

  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen message="redireccionando..." />;
  if (!me?.firstName) return <LoadingScreen message="redireccionando..." />;

  if (!me.isActive) return <BlockScreen onPress={logout} />;

  return <LoadingScreen />;
};

const LoadingScreen = ({ message = 'cargando...' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Kichwa App</Text>
      <View>
        <Text style={styles.textLoading}>{message}</Text>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </View>
  );
};

const BlockScreen = ({ onPress }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Kichwa App</Text>
      <Text style={styles.textMessage}>
        Tu cuenta ha sido bloqueada, contacta con nuestro equipo
      </Text>
      <Pressable onPress={onPress}>
        <View style={styles.containerLogout}>
          <Text style={styles.textLogout}>Cerrar sesión</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  textLoading: {
    marginBottom: 12,
  },
  textMessage: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 16,
  },
  containerLogout: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.whiteLight,
    borderRadius: 5,
    elevation: 5,
  },
  textLogout: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerSync: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    elevation: 5,
    marginEnd: 8,
  },
  textSync: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
