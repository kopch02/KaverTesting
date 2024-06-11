import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TextInput } from 'react-native';
import { observer } from 'mobx-react-lite';
import { pexelsStore } from './stores/ExampleStore';

const App = observer(() => {
  useEffect(() => {
    pexelsStore.searchPhotos('Nature', 5);
  }, []);

  const [text, setText] = useState("");
//={q => pexelsStore.searchPhotos(text, 100)}

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <TextInput style={styles.text_input} onChangeText={text => setText(text)}>asd</TextInput>
      <Button title="Search" onPress={() => pexelsStore.searchPhotos(text, 5)} />
      {pexelsStore.loading && <Text>Loading...</Text>}
      {pexelsStore.error && <Text>Error: {pexelsStore.error}</Text>}
      <View style={styles.row}>
        {pexelsStore.photos.map((photoUrl, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: photoUrl }} style={styles.image} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    display:'flex',
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
    width: '30%',
    padding: 5,
  },
  image: {
    aspectRatio: 1,
  },
  text_input: {
    borderWidth: 1,
    borderRadius:10,
    width: '100%',
  },
});

export default App;
