import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import { unsplashStore } from '../../stores/ExampleStore';

import ImageModal from '../../modals/ImageModal/ImageModal';
import Search from '../../components/Search/Search';
import ImageList from '../../components/ImagesList/ImageList';

const HomeScreen = observer(() => {
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhotos = (newPhotos: string[]) => {
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  useEffect(() => {
    const fetchData = async () => {
      //   const res = await unsplashStore.searchPhotos('')
      //   setPhotos(res);
    };
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await unsplashStore.searchPhotos(text);
    setPhotos(res);
    setRefreshing(false);
  };

  const SearchOnPress = async () => {
    const res = await unsplashStore.searchPhotos(text);
    setPhotos(res);
  };

  const handleEndReached = async () => {
    const res = await unsplashStore.searchPhotos(text);
    addPhotos(res);
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View>
      <Search onChangeText={setText} onEndEditing={SearchOnPress} />
      {unsplashStore.loading && <Text>Loading...</Text>}
      <ImageList
        photos={photos}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleEndReached={handleEndReached}
        onPressItem={handleImagePress}
      />
      <ImageModal
        selectedImage={selectedImage}
        closeModal={closeModal}
        modalVisible={modalVisible}
      />
    </View>
  );
});

export default HomeScreen;
