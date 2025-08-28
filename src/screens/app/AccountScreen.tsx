// Componente AccountScreen que muestra el perfil del usuario. 
// Incluye la foto de perfil, nombre, correo electrónico y varias secciones como progreso, insignias y registros semanales. 
// También permite realizar acciones relacionadas con la cuenta y unirse a cursos. 
// Usa `useProfile` para obtener la información del usuario y organiza el contenido en un diseño desplazable con `ScrollView`.
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import JoinCourseCard from 'src/components/profile/JoinCourseCard';
import ProfileActions from 'src/components/profile/ProfileActions';
import UserBadges from 'src/components/profile/UserBadges';
import UserProgress from 'src/components/profile/UserProgress';
import WeeklyLogs from 'src/components/profile/WeeklyLogs';
import { GlobalStyles } from 'src/constants/GlobalStyles';
import useProfile from 'src/hooks/data/useProfile';
import { Colors } from '../../constants/Colors';

const AccountScreen = () => {
  const { me } = useProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.blueBackground} />
        <View style={GlobalStyles.body}>
          <View style={styles.profileContainer}>
            <View style={styles.leftSide}>
              <Image
                source={
                  me.avatar && me.avatar.trim() !== ''
                    ? { uri: me.avatar }
                    : require('./../../../assets/user.jpg')
                }
                style={styles.profileImage}
              />

              <View>
                <Text
                  style={styles.nameText}
                  numberOfLines={1}
                  ellipsizeMode="tail" // Puede ser 'head', 'middle', o 'tail'
                >
                  {me.firstName + ' ' + me.lastName}
                </Text>

                <Text
                  style={styles.emailText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {me.email}
                </Text>
              </View>
            </View>
            <ProfileActions />
          </View>
          <UserProgress />
          <UserBadges />
          <WeeklyLogs />
          <JoinCourseCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteLight,
  },
  blueBackground: {
    backgroundColor: Colors.primary,
    width: Dimensions.get('screen').width + 200,
    height: 180,
    borderBottomEndRadius: 200,
    borderBottomStartRadius: 200,
    position: 'absolute',
    top: -80,
    left: -100,
    right: -100,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    columnGap: 12,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: 160, // Ajusta el ancho máximo
    color: Colors.white,
    overflow: 'hidden',
  },
  emailText: {
    fontSize: 14,
    color: Colors.white,
    maxWidth: 160, // Ajusta el ancho máximo
    overflow: 'hidden',
  },
});
