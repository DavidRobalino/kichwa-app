// Este código define un componente llamado 'ProfileActions' que gestiona las acciones relacionadas con el perfil del usuario. 
// El componente muestra un menú de opciones para editar la información personal, cambiar la contraseña o cerrar sesión. 
// Al seleccionar una opción, se abre un modal correspondiente con el formulario adecuado. 
// El modal tiene tres posibles vistas: 'editar nombre', 'cambiar contraseña' y 'cerrar sesión', 
// y se cierra al hacer clic en un botón de cerrar dentro del modal o al seleccionar una acción.
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Colors } from '../../constants/Colors';
import Logout from './modals/Logout';
import UpdateAccount from './modals/UpdateAccount';
import UpdatePassword from './modals/UpdatePassword';

type ModalType = 'editName' | 'editPassword' | 'logout';

const ProfileActions = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);

  const openModal = (modalType: ModalType) => {
    setCurrentModal(modalType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentModal(null);
  };

  return (
    <View style={styles.iconsContainer}>
      <Menu>
        <MenuTrigger>
          <View style={styles.btnOptions}>
            <AntDesign name="edit" size={20} color={Colors.primary} />
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => openModal('editName')}
            style={styles.menuOption}
          >
            <Text style={styles.menuText}>Editar información</Text>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption
            onSelect={() => openModal('editPassword')}
            style={styles.menuOption}
          >
            <Text style={styles.menuText}>Cambiar contraseña</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <Pressable onPress={() => openModal('logout')} style={styles.btnLogout}>
        <AntDesign name="logout" size={20} color={Colors.red} />
      </Pressable>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          {currentModal === 'editName' && (
            <UpdateAccount closeModal={closeModal} />
          )}
          {currentModal === 'editPassword' && (
            <UpdatePassword closeModal={closeModal} />
          )}
          {currentModal === 'logout' && <Logout closeModal={closeModal} />}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    columnGap: 8,
  },
  btnOptions: {
    backgroundColor: Colors.primaryLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  btnLogout: {
    backgroundColor: Colors.redLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparente para el fondo del modal
  },
  menuOption: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});

export default ProfileActions;
