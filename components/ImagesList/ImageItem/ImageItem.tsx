import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {styles} from './InageItemStyle';

interface ImageItemProps {
  image: string;
  onPress: (image: string) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({image, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => onPress(image)}>
      <Image source={{uri: image}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ImageItem;
