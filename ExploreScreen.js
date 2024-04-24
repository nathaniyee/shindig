import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Image, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tagIcons = {
  outdoor: 'leaf',
  fitness: 'fitness',
  money: 'cash-outline',
  nature: 'flower',
  food: 'fast-food',
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const tiles = [
  {id: "1", uri: require('./images/2-3-vertical-turtle-pond-ut-tower.jpg'), name: "UT Campus Walk", compatibility: "99%", rating: 5, tags: ['outdoor']},
  {id: "2", uri: require('./images/6532dc8ea5091c7dc84ea8ad_xnXiCe82SMOl4fjLskM0O9P3xTOVVScZazwxF-OBvPI.png'), name: "Black Swan Yoga", compatibility: "80%", rating: 3, tags: ['fitness', 'money']},
  {id: "3", uri: require('./images/austin-skyline-with-barton-spring-pool-vertical-DR204008.jpg'), name: "Barton Springs", compatibility: "90%", rating: 4, tags: ['outdoor', 'nature']},
  {id: "4", uri: require('./images/amyicecreamtinder.jpeg'), name: "Amy's Ice Cream", compatibility: "95%", rating: 4, tags: ['food','money']},
  {id: "5", uri: require('./images/blantontinder.jpeg'), name: "Blanton Art Museum", compatibility: "75%", rating: 3, tags: ['money']},
]


export default function ExploreScreen({ navigation }) {

  const [position] = useState(new Animated.ValueXY());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(-1);
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
            setCurrentIndex(0);
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
            setCurrentIndex(0);
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

  const renderStarRating = (rating) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        // Render a filled star icon
        starIcons.push(<Ionicons key={i} name="star" size={30} color="#B973DA" />);
      } else {
        // Render an empty star icon
        starIcons.push(<Ionicons key={i} name="star-outline" size={30} color="#B973DA" />);
      }
    }
    return starIcons;
  };

  const renderTags = (tags) => {
    return tags.map((tag, index) => {
      if (tagIcons[tag]) {
        return (
          <View key={index} style={[styles.tagContainer, { left: 35 + (70) * index }]}>
            <View style={styles.tagIconContainer}>
              <Ionicons name={tagIcons[tag]} size={24} color="white" style={styles.tagIcon} />
            </View>
          </View>
        );
      } else {
        return null; // Handle unrecognized tags
      }
    });
  };
  


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

            {/*Yes*/}
            <Animated.View style={{opacity: likeOpacity, transform: [{rotate:'-30deg'}], position:'absolute', top: 150, left: 40, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'green', color:'green', fontSize: 32, fontWeight: '800', borderRadius: 10, padding: 10}}>Yes!</Text>
            </Animated.View>
            {/*No*/}
            <Animated.View style={{opacity: dislikeOpacity, transform: [{rotate:'30deg'}], position:'absolute', top: 150, right: 40, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'red', color:'red', fontSize: 32, fontWeight: '800', padding: 10, borderRadius: 10,}}>Nope!</Text>
            </Animated.View>

            <View style={styles.circle}>
              <Text style={styles.circleText}>{item.compatibility}</Text>
            </View>

            <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.name}
             </Text>
            </View>

            <View style={styles.starRatingContainer}>
            {renderStarRating(item.rating)}
            </View>

            <View style={styles.tagContainer}>
            {renderTags(item.tags)}
            </View>


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
            <View style={styles.circle}>
              <Text style={styles.circleText}>{item.compatibility}</Text>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>

            <View style={styles.starRatingContainer}>
            {renderStarRating(item.rating)}
            </View>

            <View style={styles.tagContainer}>
            {renderTags(item.tags)}
            </View>
            

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
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40, // Adjust this value to move the circle down
    right: 30, // Adjust this value to move the circle left
    zIndex: 1000,
  },
  circleText: {
    color: '#B973DA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    zIndex: 1000,
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    borderColor: 'black',
  },
  starRatingContainer: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    zIndex: 1000,
    flexDirection: 'row',
  },
  tagContainer: {
    position: 'absolute',
    bottom: 77, // Adjust vertical position as needed
    zIndex: 1000,
  },
  tagIconContainer: {
    width: 60,
    height: 30,
    borderRadius: 20, // Ensures oval shape
    backgroundColor: '#B973DA', // Tag background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagIcon: {
    zIndex: 1001, // Ensure the icon appears above the background
  },
});
 