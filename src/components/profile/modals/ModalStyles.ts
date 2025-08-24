import { StyleSheet } from 'react-native';

export const ModalStyles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1, // Asegura que el contenido se expanda
    justifyContent: 'center', // Centra el contenido verticalmente
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexShrink: 1,
    width: '100%',
    columnGap: 12,
  },
});
