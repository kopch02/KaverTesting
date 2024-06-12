import {
  Modal,
  Image,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {styles} from './ImageModalStyle';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';

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
  const ZoomEnding = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    zoomableViewEventObject: ZoomableViewEvent,
  ) => {
    if (zoomableViewEventObject.zoomLevel <= 0.6) {
      closeModal();
    }
  };

  const DoubleTap = (
    event: GestureResponderEvent,
    zoomableViewEventObject: ZoomableViewEvent,
  ) => {
    zoomableViewEventObject.zoomLevel += 6;
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeModal}>
      <ReactNativeZoomableView
        maxZoom={10}
        minZoom={0.4}
        zoomStep={1.2}
        initialZoom={1}
        onDoubleTapAfter={DoubleTap}
        onZoomEnd={ZoomEnding}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        )}
      </ReactNativeZoomableView>
    </Modal>
  );
};

export default ImageModal;
