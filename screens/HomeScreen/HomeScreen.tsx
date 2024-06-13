import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {unsplashStore} from '../../stores/UnsplashStore';

import ImageModal from '../../modals/ImageModal/ImageModal';
import ImageHoldModal from '../../modals/ImageHoldModal/ImageHoldModal';
import Search from '../../components/Search/Search';
import ImageList from '../../components/ImagesList/ImageList';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    regular: string;
    download: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [holdModalVisible, setHoldModalVisible] = useState(false);
  const [photos, setPhotos] = useState<{regular: string; download: string}[]>(
    [],
  );

  const addPhotos = (newPhotos: {regular: string; download: string}[]) => {
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await unsplashStore.searchPhotos('');
      setPhotos(res);
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

  const handleImagePress = (imageUri: {regular: string; download: string}) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleImageHold = (imageUri: {regular: string; download: string}) => {
    setSelectedImage(imageUri);
    setHoldModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
  const closeHoldModal = () => {
    setSelectedImage(null);
    setHoldModalVisible(false);
  };

  return (
    <View>
      <Search onChangeText={setText} onEndEditing={SearchOnPress} />
      {unsplashStore.loading && <Text>Loading...</Text>}
      {unsplashStore.error && <Text>{unsplashStore.error}</Text>}
      <ImageList
        photos={photos}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleEndReached={handleEndReached}
        onPressItem={handleImagePress}
        onLongPressItem={handleImageHold}
        onPressOut={closeHoldModal}
      />
      <ImageModal
        selectedImage={selectedImage}
        closeModal={closeModal}
        modalVisible={modalVisible}
      />
      {selectedImage && (
        <ImageHoldModal
          selectedImage={selectedImage.regular}
          closeModal={closeHoldModal}
          modalVisible={holdModalVisible}
        />
      )}
    </View>
  );
};

export default HomeScreen;
