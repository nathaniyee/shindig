import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const tiles = [
  {id: "1", uri: require('./images/2-3-vertical-turtle-pond-ut-tower.jpg'), name: "UT"},
  {id: "2", uri: require('./images/6532dc8ea5091c7dc84ea8ad_xnXiCe82SMOl4fjLskM0O9P3xTOVVScZazwxF-OBvPI.png'), name: "Black Swan Yoga"},
  {id: "3", uri: require('./images/austin-skyline-with-barton-spring-pool-vertical-DR204008.jpg'), name: "Barton Springs"},
]


export default function ExploreScreen({ navigation }) {

  const [position] = useState(new Animated.ValueXY());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotate] = useState(position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  }));
  const rotateAndTranslate = {
    transform: [
      { rotate: rotate },
      ...position.getTranslateTransform(),
    ],
  };
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder:(evt, gestureState) => true,
    onPanResponderMove:(evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy})
    },
    onPanResponderRelease:(evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
        }).start(() => {
          if (currentIndex === tiles.length - 1) {
            setCurrentIndex(0); // Reset to the first image
          } else {
            setCurrentIndex(currentIndex + 1);
          }          
          position.setValue({x: 0, y: 0});
        });
      }
      else if (gestureState.dx < -120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
        }).start(() => {
          if (currentIndex === tiles.length - 1) {
            setCurrentIndex(0); // Reset to the first image
          } else {
            setCurrentIndex(currentIndex + 1);
          }          
          position.setValue({x: 0, y: 0});
        });
      }
      else {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: {x: 0, y: 0},
          friction: 4,
        }).start();
      }
    },
  });


  const renderTiles = () => {
    return tiles.map((item, i) => {
      if (i < currentIndex || i - currentIndex > 1) {
        return null;
      }
      else if (i == currentIndex) {
        return(
          <Animated.View 
          {...PanResponderInstance.panHandlers}
          key={item.id} 
          style={[rotateAndTranslate,{height:SCREEN_HEIGHT-175, width:SCREEN_WIDTH, top: -75, padding: 10, position:'absolute'}]}>

            <Animated.View style={{opacity: likeOpacity, transform: [{rotate:'-30deg'}], position:'absolute', top: 50, left: 40, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'green', color:'green', fontSize: 32, fontWeight: '800', padding: 10}}>Yes!</Text>
            </Animated.View>

            <Animated.View style={{opacity: dislikeOpacity, transform: [{rotate:'30deg'}], position:'absolute', top: 50, right: 40, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'red', color:'red', fontSize: 32, fontWeight: '800', padding: 10}}>Nope!</Text>
            </Animated.View>

            <Image 
              style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:20}}
              source={item.uri}
            />
          </Animated.View>
        );
      }
      else {
        return(
          <Animated.View 
          key={item.id} 
          style={[{opacity: nextCardOpacity, transform:[{scale: nextCardScale}],height:SCREEN_HEIGHT-175, width:SCREEN_WIDTH, top: -75, padding: 10, position:'absolute'}]}>
            <Image 
              style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:20}}
              source={item.uri}
            />
          </Animated.View>
        );
      }
      
    }).reverse();
  }


  return (
    <View style={{flex:1}}>
      <View style={{height:150}}>

      </View>
      <View style={{flex:1}}>
        {renderTiles()}
      </View>
      <View style={{height:150}}>

      </View>
    </View>
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
 