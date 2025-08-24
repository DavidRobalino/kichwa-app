import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from 'src/components/common/button/Button';
import { Colors } from 'src/constants/Colors';
import { ModalStyles } from './ModalStyles';
import { Http } from 'src/libraries/Http';
import useProfile from 'src/hooks/data/useProfile';

interface IModalProps {
  closeModal: () => void;
}

const Logout = ({ closeModal }: IModalProps) => {
  const { cleanProfile } = useProfile();
  const [waiting, setWaiting] = useState(false);

  const handleLogout = async () => {
    setWaiting(true);
    const res = await Http.instance.post({ url: '/auth/logout' });
    if (res.statusCode !== 200) {
      setWaiting(false);
      return Alert.alert('Error', 'No se puede cerrar sesión en este momento');
    }
    cleanProfile();
    setWaiting(false);
  };

  return (
    <View style={ModalStyles.modalContainer}>
      <ScrollView contentContainerStyle={ModalStyles.scrollViewContent}>
        <Text style={ModalStyles.modalTitle}>
          ¿Estas seguro de querer cerrar sesión?
        </Text>
        <View style={ModalStyles.buttonContainer}>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              text="Cancelar"
              buttonColor={Colors.white}
              borderColor={Colors.gray}
              textColor={Colors.black}
              onClick={closeModal}
            />
          </View>
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              text="Cerrar sesión"
              buttonColor={Colors.red}
              onClick={handleLogout}
              waiting={waiting}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Logout;
