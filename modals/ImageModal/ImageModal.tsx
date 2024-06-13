import {
  Modal,
  Image,
  GestureResponderEvent,
  PanResponderGestureState,
  Text,
  Pressable,
} from 'react-native';
import React from 'react';
import {styles} from './ImageModalStyle';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import downloadImage from '../../utils/DownloadImage';

interface ImageModalProps {
  selectedImage: {regular: string; download: string} | null;
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
    if (zoomableViewEventObject.zoomLevel <= 0.9) {
      closeModal();
    }
  };

  const DoubleTap = (
    event: GestureResponderEvent,
    zoomableViewEventObject: ZoomableViewEvent,
  ) => {
    zoomableViewEventObject.zoomLevel += 6;
  };

  const handleShiftingEnd = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    zoomableViewEventObject: ZoomableViewEvent,
  ) => {
    if (gestureState.dy < -300) {
      closeModal();
    } else if (gestureState.dy > 300) {
      closeModal();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeModal}>
      {selectedImage && (
        <Pressable
          onPress={() => downloadImage(selectedImage.download)}
          style={styles.button_download}>
          <Text style={styles.button_text}>D</Text>
        </Pressable>
      )}
      <Pressable onPress={closeModal} style={styles.button}>
        <Text style={styles.button_text}>X</Text>
      </Pressable>
      <ReactNativeZoomableView
        maxZoom={10}
        minZoom={1}
        zoomStep={1.2}
        initialZoom={1}
        onDoubleTapAfter={DoubleTap}
        onZoomEnd={ZoomEnding}
        onShiftingEnd={handleShiftingEnd}
        style={styles.modalContainer}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage.regular}}
            style={styles.modalImage}
          />
        )}
      </ReactNativeZoomableView>
    </Modal>
  );
};

export default ImageModal;
