import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {styles} from './SearchStyle';

interface SearchProps {
  onChangeText: (text: string) => void;
  onEndEditing: () => void;
}

const Search: React.FC<SearchProps> = ({onChangeText, onEndEditing}) => {
  return (
    <TextInput
      style={styles.search}
      onChangeText={text => onChangeText(text)}
      onEndEditing={() => onEndEditing()}
      placeholder="Search"></TextInput>
  );
};

export default Search;
