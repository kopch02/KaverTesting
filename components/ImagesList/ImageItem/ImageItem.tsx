import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {styles} from './InageItemStyle';

interface ImageItemProps {
  image: {regular: string; download: string};
  onPress: (image: {regular: string; download: string}) => void;
  onLongPress: (image: {regular: string; download: string}) => void;
  onPressOut: () => void;
}

const ImageItem: React.FC<ImageItemProps> = ({
  image,
  onPress,
  onLongPress,
  onPressOut,
}) => {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => onPress(image)}
      onLongPress={() => onLongPress(image)}
      delayLongPress={300}
      onPressOut={onPressOut}>
      <Image source={{uri: image.regular}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ImageItem;
