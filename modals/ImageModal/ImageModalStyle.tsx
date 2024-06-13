import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_download: {
    backgroundColor: 'black',
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 45,
    zIndex: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 16,
  },
});
