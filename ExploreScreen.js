import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Card from './components/Card';

export default function ExploreScreen({ navigation }) {
  navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardInner: {
    padding: 10,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  card: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
 
 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.68,
 
 
    elevation: 11,
  },
  exploreImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
 
 
    justifyContent: 'flex-end',
    padding: 20,
  },
  searchContainer: {
      paddingTop: 250,
      flexGrow: 1,
  },
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
  text: {
      fontSize: 32,
      fontWeight: 'bold',
  },
  userBlock: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  listItem: {
    flexDirection: 'row', // Keep flexDirection as row
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginLeft: 'auto', // Move the image to the right using marginLeft: 'auto'
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  imageList: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'cover',
  },
  locationTitle: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: 'bold',
  },
  locationDescription: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
 
 
  },
 });
 