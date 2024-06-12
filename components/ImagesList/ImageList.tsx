import React from 'react';
import {FlatList, RefreshControl} from 'react-native';

import ImageItem from './ImageItem/ImageItem';
import {styles} from './InageListStyle';

interface ImageListProps {
  photos: string[];
  refreshing: boolean;
  onRefresh: () => void;
  handleEndReached: () => void;
  onPressItem: (item: string) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  photos,
  refreshing,
  onRefresh,
  handleEndReached,
  onPressItem,
}) => {
  const renderItem = ({item}: {item: string}) => (
    <ImageItem image={item} onPress={onPressItem} />
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={handleEndReached}></FlatList>
  );
};

export default ImageList;
