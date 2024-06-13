import {
  Modal,
  Image,
} from 'react-native';

import React from 'react';
import {styles} from './ImageHoldModalStyle';

interface ImageModalProps {
  selectedImage: string | null;
  closeModal: () => void;
  modalVisible: boolean;
}

const ImageHoldModal: React.FC<ImageModalProps> = ({
  selectedImage,
  closeModal,
  modalVisible,
}) => {

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeModal}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.modalImage}/>
        )}
    </Modal>
  );
};

export default ImageHoldModal;
