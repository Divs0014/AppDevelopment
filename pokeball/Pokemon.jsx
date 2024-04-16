import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

const Pokemon = () => {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        console.log(response.data.results);
        setPokeData(response.data.results);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <ImageBackground
      source={require('./poke.jpg')} // Replace with your image URL
      style={styles.root}
      onError={() => console.log('Error loading background image')}>
      <FlatList
        data={pokeData}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    item.url.split('/')[6]
                  }.png`,
                }}
                style={styles.image}
              />
            </View>
          );
        }}
        keyExtractor={item => item.name}
        numColumns={2} // Adjust the number of columns as needed
        contentContainerStyle={styles.container}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 120,
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 10,
    color:'black'
  },
  image: {
    height: 80,
    width: 80,
    marginBottom: 10,
  },
});

export default Pokemon;
