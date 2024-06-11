import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {unsplashStore} from './stores/ExampleStore';

const App = observer(() => {
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
      const res = await unsplashStore.searchPhotos('')
      setPhotos(res);
    };
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await unsplashStore.searchPhotos(text)
    setPhotos(res);
    setRefreshing(false);
  };

  const SearchOnPress = async () => {
    const res = await unsplashStore.searchPhotos(text)
    setPhotos(res);
  };

  const renderItem = ({item}: { item: string }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  const handleEndReached = async () => {
    const res = await unsplashStore.searchPhotos(text)
    addPhotos(res)
  };

  const handleImagePress = (imageUri:string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View>
      <TextInput
        style={styles.text_input}
        onChangeText={text => setText(text)} 
        onEndEditing={() => SearchOnPress()}
        placeholder='Поиск'></TextInput>
    <FlatList
    data={photos}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    contentContainerStyle={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    onEndReached={handleEndReached}
    >
    </FlatList>
    <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
        {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  imageContainer: {
    width: '50%',
    padding: 5,
    },
  image: {
    aspectRatio: 1,
    borderRadius:10,
  },
  text_input: {
    // borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default App;
