import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from 'src/components/common/button/Button';
import BasePasswordInput from 'src/components/common/inputs/BasePasswordInput';
import { Colors } from 'src/constants/Colors';
import { ModalStyles } from './ModalStyles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Http } from 'src/libraries/Http';
import ControlledPasswordInput from 'src/components/common/forms/ControlledPasswordInput';

interface IModalProps {
  closeModal: () => void;
}

interface UpdatePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = ({ closeModal }: IModalProps) => {
  const { control, handleSubmit } = useForm<UpdatePassword>({
    defaultValues: { password: '', newPassword: '' },
  });

  const [waiting, setWaiting] = useState(false);
  const updatePassword: SubmitHandler<UpdatePassword> = async (data) => {
    const isSame = data.newPassword === data.confirmPassword;
    if (!isSame) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    setWaiting(true);
    console.log(data);
    const values = {
      password: data.password,
      newPassword: data.newPassword,
    };
    const res = await Http.instance.post({
      url: '/auth/update-password',
      body: values,
    });
    if (res.statusCode !== 200) {
      setWaiting(false);
      Alert.alert('Error', res.message + '');
      return;
    }
    setWaiting(false);
    Alert.alert('Exito', 'Contraseña actualizada');
  };
  return (
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={ModalStyles.modalTitle}>Cambiar contraseña</Text>
        <ControlledPasswordInput
          control={control}
          name="password"
          label="Contraseña actual"
          iconName="lock"
          validations={{ required: 'Se necesita la contraseña actual' }}
          required
        />
        <ControlledPasswordInput
          control={control}
          name="newPassword"
          label="Nueva contraseña"
          iconName="lock"
          validations={{ required: 'Se necesita la nueva contraseña' }}
          required
        />
        <ControlledPasswordInput
          control={control}
          name="confirmPassword"
          label="Confirmar contraseña"
          iconName="lock"
          validations={{ required: 'Se necesita la confirmar contraseña' }}
          required
        />
        <View
          style={[
            ModalStyles.buttonContainer,
            { flexDirection: 'column', rowGap: 12 },
          ]}
        >
          <View style={{ flexShrink: 1, width: '100%' }}>
            <Button
              text="Cambiar contraseña"
              buttonColor={Colors.green}
              /*onClick={closeModal}*/
              width="100%"
              waiting={waiting}
              onClick={handleSubmit(updatePassword)}
            />
          </View>
          <View style={{ flexShrink: 1, width: '100%', marginBottom: 50 }}>
            <Button
              text="Cancelar"
              buttonColor={Colors.white}
              borderColor={Colors.gray}
              textColor={Colors.black}
              onClick={closeModal}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  scrollViewContent: {
    flexGrow: 1, // Esto asegura que el ScrollView ocupe todo el espacio disponible
  },
});
