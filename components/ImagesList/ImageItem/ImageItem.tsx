import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {styles} from './InageItemStyle';

interface ImageItemProps {
  image: string;
  onPress: (image: string) => void;
  onLongPress: (image: string) => void;
  onPressOut: () => void;
}

const ImageItem: React.FC<ImageItemProps> = ({image, onPress, onLongPress, onPressOut}) => {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => onPress(image)}
      onLongPress={() => onLongPress(image)}
      delayLongPress={300}
      onPressOut={onPressOut}>
      <Image source={{uri: image}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ImageItem;
