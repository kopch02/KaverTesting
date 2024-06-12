import {Modal, TouchableOpacity, Image} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {styles} from './ImageModalStyle';

interface ImageModalProps {
  selectedImage: string | null;
  closeModal: () => void;
  modalVisible: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedImage,
  closeModal,
  modalVisible,
}) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeModal}>
      <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default ImageModal;
