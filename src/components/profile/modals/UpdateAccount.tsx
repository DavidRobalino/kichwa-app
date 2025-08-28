import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from 'src/components/common/button/Button';
import BaseInput from 'src/components/common/inputs/BaseInput';
import { Colors } from 'src/constants/Colors';
import { ModalStyles } from './ModalStyles';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledInput from 'src/components/common/forms/ControlledInput';
import useProfile from 'src/hooks/data/useProfile';
import { Http } from 'src/libraries/Http';

interface IModalProps {
  closeModal: () => void;
}
interface UpdateValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}
const UpdateAccount = ({ closeModal }: IModalProps) => {
  const { me, mutate } = useProfile();
  const [waiting, setWaiting] = useState(false);
  const { control, handleSubmit } = useForm<UpdateValues>();
  const updateAccount: SubmitHandler<UpdateValues> = async (data) => {
    console.log(data);
    setWaiting(true);
    const res = await Http.instance.put({ url: '/profile', body: data });
    if (res.statusCode !== 200) {
      Alert.alert('Error', res.message + '');
      setWaiting(false);
      return;
    }
    Alert.alert('Exito', 'Cuenta actualizada');
    setWaiting(false);
    mutate();
  };

  return (
    <View style={styles.modalContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="always"
      >
        <Text style={ModalStyles.modalTitle}>Editar información</Text>
        <ControlledInput
          control={control}
          name="firstName"
          validations={{ required: 'Este campo es obligatorio' }}
          label="Nombre"
          iconName="user"
          placeholder="Ingrese su Nombre"
          defaultValue={me.firstName}
          required
        />
        <ControlledInput
          control={control}
          name="lastName"
          validations={{ required: 'Este campo es obligatorio' }}
          label="Apellido"
          iconName="user"
          placeholder="Ingrese su Apellido"
          defaultValue={me.lastName}
          required
        />
        <ControlledInput
          control={control}
          name="username"
          validations={{ required: 'Este campo es obligatorio' }}
          label="Alias"
          iconName="aliwangwang-o1"
          placeholder="Ingrese su alias"
          defaultValue={me.username}
          required
        />
        <ControlledInput
          control={control}
          name="email"
          validations={{ required: 'Este campo es obligatorio' }}
          label="Correo"
          iconName="mail"
          placeholder="Ingrese su correo"
          defaultValue={me.email}
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
              text="Guardar cambios"
              buttonColor={Colors.green}
              onClick={handleSubmit(updateAccount)}
            />
          </View>
          <View style={{ flexShrink: 1, width: '100%', marginBottom: 100 }}>
            <Button
              text="Cancelar"
              buttonColor={Colors.white}
              borderColor={Colors.gray}
              textColor={Colors.black}
              onClick={closeModal}
              waiting={waiting}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateAccount;

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    height: '75%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  scrollViewContent: {
    flexGrow: 1, // Esto asegura que el ScrollView ocupe todo el espacio disponible
  },
});
