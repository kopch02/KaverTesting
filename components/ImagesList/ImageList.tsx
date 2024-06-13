import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {observer} from 'mobx-react-lite';

import ImageItem from './ImageItem/ImageItem';
import {styles} from './InageListStyle';

interface ImageListProps {
  photos: string[];
  refreshing: boolean;
  onRefresh: () => void;
  handleEndReached: () => void;
  onPressItem: (item: string) => void;
  onLongPressItem: (item: string) => void;
  onPressOut: () => void;
}

const ImageList: React.FC<ImageListProps> = observer(
  ({
    photos,
    refreshing,
    onRefresh,
    handleEndReached,
    onPressItem,
    onLongPressItem,
    onPressOut,
  }) => {
    const renderItem = ({item}: {item: string}) => (
      <ImageItem
        image={item}
        onPress={onPressItem}
        onLongPress={onLongPressItem}
        onPressOut={onPressOut}
      />
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
  },
);

export default ImageList;
