import React, { useState, useEffect, useRef } from 'react';
import { TextInput, FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Animated, PanResponder, Dimension, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-gesture-handler";


import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';


const myData = [
  { id: 1, name: "Amy's Ice Cream", description: "Amy's Ice Creams is a privately owned chain of ice cream shops in Texas with headquarters in Austin. The Austin Chronicle described Amy's as a \"quintessentially Austin institution\" which \"dominates the local ice cream scene.\" Amy's ice cream is owned by Amy Simmons.", image: require('./images/amyicecreamtinder.jpeg'), rating: 4, distance: '1.1 mi', compatability: 95},
  { id: 2, name: 'Blanton Art Museum', description: 'The Jack S. Blanton Museum of Art at the University of Texas at Austin is one of the largest university art museums in the U.S. with 189,340 square feet devoted to temporary exhibitions, permanent collection galleries, storage, administrative offices, classrooms, a print study room, an auditorium, shop, and cafe.', image: require('./images/blanton.jpeg'), rating: 3, distance: '0.4 mi', compatability: 75 },
  { id: 3, name: 'Franklin Barbecue', description: 'Long lines form early for brisket, pulled pork & other smoked meats at this bustling spot.', image: require('./images/franklin.jpg'), rating: 5, distance: '1.2 mi', compatability: 60},
  { id: 4, name: 'Lady Bird Lake', description: 'Lady Bird Lake is a river-like reservoir on the Colorado River in Austin, Texas, United States. The City of Austin created the reservoir in 1960 as a cooling pond for a new city power plant. The lake, which has a surface area of 416 acres, is now used primarily for recreation and flood control.', image: require('./images/lbl.jpeg'), rating: 4, distance: '2.9 mi', compatability: 95},
  { id: 5, name: 'Pizza Press', description: 'Nostalgic restaurant doling out pizza, beer & more in casual, 1920s-style surroundings.', image: require('./images/pizzapress.jpeg'), rating: 3, distance: '0.4 mi', compatability: 70},
  { id: 6, name: 'Texas Capitol', description: 'The Texas State Capitol is the capitol and seat of government of the American state of Texas. Located in downtown Austin, Texas, the structure houses the offices and chambers of the Texas Legislature and of the Governor of Texas.', image: require('./images/capitol.jpg'), rating: 2, distance : '0.8 mi', compatability: 40},
  { id: 7, name: 'UT Campus Walk', description: 'Want to explore the 40 acres? Go on this self-guided tour to learn the history behind some of UT Austin’s most iconic buildings and features', image: require('./images/2-3-vertical-turtle-pond-ut-tower.jpg'), rating: 5, distance: '0.2 mi', compatability: 99},
]

const myGroups = [
  {id: 1, name: 'My Family', members: 4, image: require('./images/family.jpeg')},
  {id: 2, name: 'My Friend Group', members: 1, image: require('./images/friends.jpeg')},
  {id: 3, name: 'Convergent Brown Bags', members: 6, image: require('./images/convergent.png')},
]

const BOTTOM_SHEET_MAX_HEIGHT = 0.6 * Dimensions.get('window').height;
const BOTTOM_SHEET_MIN_HEIGHT = 0.1 * Dimensions.get('window').height;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

function SearchScreen({ navigation }) {
  navigation = useNavigation();

  const handleLocationPress = (location) => {
    navigation.navigate('LocationDetails', { location });
  }

  const [users, setUsers] = React.useState(myData);
  const [originalUsers, setOriginalUsers] = React.useState(myData);

  React.useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeHolder: 'Search',
        color: '#B973DA',
        onChangeText: (event) => {
          handleFilter(event.nativeEvent.text);
        },
        onCancel: () => {
          handleCancel();
        },
      }
    });
  }, [navigation]);

  function handleFilter(searchTerm) {
    if (searchTerm.trim() === '') {
      setUsers(originalUsers);
      setOriginalUsers(originalUsers);
    }
    else {
      const filteredUsers = originalUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
      
    }
  }

  function handleCancel() {
    setUsers(originalUsers);
  }

  const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={20}
          color={i < rating ? '#893eac' : '#3b3b3b'}
        />
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  return (
    <ScrollView contentContainerStyle={styles.searchContainer}>
      <View>
        {users.map((user, idx) => (
          <TouchableOpacity style={styles.listItem} key={idx} onPress={() => handleLocationPress(user)}>
            <View style={styles.infoContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.searchText}>{user.name}</Text>
                <View style={styles.ratingDistanceContainerInSearch}>
                  <RatingStars rating={user.rating} />
                  <Text style={styles.distanceText}>{user.distance}</Text>
                </View>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.imageList} source={user.image} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function GroupScreen({ navigation }) {
  navigation = useNavigation();

  const handleGroupPress = (group) => {
    navigation.navigate('GroupDetails', { group });
  }

  const handleCreateGroup = () => {
    // Navigate to the screen where you can create a new group
    navigation.navigate('CreateGroup');
  };

  const [groups, setGroups] = React.useState(myGroups);
  const [originalGroups, setOriginalGroups] = React.useState(myGroups);

  React.useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeHolder: 'Search for groups',
        color: '#B973DA',
        onChangeText: (event) => {
          handleFilter(event.nativeEvent.text);
        },
        onCancel: () => {
          handleCancel();
        },
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleCreateGroup} style={{ marginRight: 20 }}>
          <Ionicons name="add" size={27} color="#B973DA" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function handleFilter(searchTerm) {
    if (searchTerm.trim() === '') {
      setGroups(originalGroups);
      setOriginalGroups(originalGroups);
    }
    else {
      const filteredGroups = originalGroups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setGroups(filteredGroups);
    }
  }

  function handleCancel() {
    setGroups(originalGroups);
  }

  const renderMemberIcons = (count) => {
    const icons = [];
    for (let i = 0; i < count; i++) {
      icons.push(<Ionicons key={i} name="person" size={24} color="#000000" />);
    }
    return icons;
  };

  return (
    <ScrollView contentContainerStyle={styles.searchContainer}>
      <View>
        {myGroups.map((group, idx) => (
          <TouchableOpacity style={styles.listItem} key={idx} onPress={() => handleGroupPress(group)}>
            <View style={styles.infoContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.searchText}>{group.name}</Text>
                <View style={styles.ratingDistanceContainerInSearch}>
                  {renderMemberIcons(group.members)}
                </View>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.imageList} source={group.image} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function CreateGroup({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  const handleCreateGroup = () => {
    // Implement logic to create a group
    console.log('Creating group with name:', groupName);
  };

  const handleJoinGroup = () => {
    // Implement logic to join a group
    console.log('Joining group with code:', groupCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Button title="Create" onPress={handleCreateGroup} />
      </View>
      <Text>OR</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter group code"
          value={groupCode}
          onChangeText={setGroupCode}
        />
        <Button title="Join" onPress={handleJoinGroup} />
      </View>
    </View>
  );
}

function GroupDetailsScreen({ route, navigation }) {
  const { group } = route.params;

  const renderMembers = (count) => {
    const icons = [];
    for (let i = 0; i < count; i++) {
      icons.push(<Ionicons key={i} name="person" size={24} color="purple" />);
    }
    return icons;
  };

  const events = [
    { id: 1, name: 'Barton Springs', },
    { id: 2, name: 'Franklin Barbecue', },
    { id: 3, name: 'Amy\'s Ice Cream', },
    { id: 4, name: 'Pizza Press', },
    { id: 5, name: 'UT Campus Walk', },
  ];

  const renderEventItem = ({ item, index }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{index+1}. {item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image source={group.image} style={{ top: 50, width: 225, height: 225, borderRadius: 150 }} />
      <Text style={{ top: 30, fontSize: 42, fontWeight: 'bold', marginTop: 10, padding: 20}}>{group.name}</Text>
      <View style={{ top: 30, flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
        {renderMembers(group.members)}
      </View>
      <Text style={styles.sectionTitle}>RESULTS</Text>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.eventList}
      />
    </View>
  );
}


function LocationDetailsScreen({ route, navigation }) {
  const { location } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  navigation = useNavigation();

  useEffect(() => {
    // Load favorite status from local storage
    loadFavoriteStatus();
  }, []);

  useEffect(() => {
    // Save favorite status to local storage whenever it changes
    saveFavoriteStatus();
  }, [isFavorite]);

  const loadFavoriteStatus = async () => {
    try {
      // Load favorite status from local storage
      const favoriteStatus = await AsyncStorage.getItem('favorite_' + location.id);
      if (favoriteStatus !== null) {
        setIsFavorite(JSON.parse(favoriteStatus));
      }
    } catch (error) {
      console.error('Error loading favorite status:', error);
    }
  };

  const saveFavoriteStatus = async () => {
    try {
      // Save favorite status to local storage
      await AsyncStorage.setItem('favorite_' + location.id, JSON.stringify(isFavorite));
    } catch (error) {
      console.error('Error saving favorite status:', error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 20 }}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={27}
            color={isFavorite ? '#B973DA' : 'black'}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite]);

  const DraggableBottomSheet = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          animatedValue.setOffset(lastGestureDy.current);
        },
        onPanResponderMove: (e, gesture) => {
          animatedValue.setValue(gesture.dy);
        },
        onPanResponderRelease: (e, gesture) => {
          animatedValue.flattenOffset();

          lastGestureDy.current += gesture.dy;
          if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
          }
          else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
          }

          if (gesture.dy > 0) {
            if (gesture.dy <= DRAG_THRESHOLD) {
              springAnimation('up');
            }
            else {
              springAnimation('down');
            }
          }
          else {
            if (gesture.dy >= -DRAG_THRESHOLD) {
              springAnimation('down');
            }
            else {
              springAnimation('up');
            }
          }
        },
    }),
    ).current;

    const springAnimation = (direction) => {
      lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
      Animated.spring(animatedValue, {
        toValue: lastGestureDy.current,
        useNativeDriver: true,
      }).start();
    };

    const bottomSheetAnimation = {
      transform: [{translateY: animatedValue.interpolate({
        inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
        outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
        extrapolate: 'clamp',
      })}],
    }

    const RatingStars = ({ rating }) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <Ionicons
            key={i}
            name={i < rating ? 'star' : 'star-outline'}
            size={20}
            color={i < rating ? '#893eac' : '#3b3b3b'}
          />
        );
      }
      return <View style={{ flexDirection: 'row' }}>{stars}</View>;
    };


    return (
      <View style={{ flex: 1 }}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>

        <Text style={styles.locationTitle}>{location.name}</Text>
        <View style={styles.ratingDistanceContainerInModal}>
          <RatingStars rating={location.rating} />
          <Text style={styles.distanceText}>{location.distance}</Text>
        </View>
        <Text style={styles.locationDescription}>{location.description}</Text>

      </Animated.View>
    </View>
    );
  };



  
  return (
    <ImageBackground source={location.image} style={styles.backgroundImage}>
      <DraggableBottomSheet />
    </ImageBackground>
  );
}


const ExploreStack = createNativeStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator screenOptions={{headerShown:false}}>
      <ExploreStack.Screen name="Explore" component={ExploreScreen}  />
    </ExploreStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="LocationDetails" component={LocationDetailsScreen} screenOptions={{headerShown: false}}/>
    </SearchStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="My Groups" component={GroupScreen} options={{headerShown: true}} />
      <ProfileStack.Screen name='GroupDetails' component={GroupDetailsScreen} options={{headerTitle: '', headerBackTitleVisible: false}}/>
      <ProfileStack.Screen name='CreateGroup' component={CreateGroup} options={{headerTitle: '', headerBackTitleVisible: false}}/>
    </ProfileStack.Navigator>
  );

}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'ExploreTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'SearchTab') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#B973DA',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarShowLabel: false,
    })}>  
        <Tab.Screen name="ExploreTab" component={ExploreStackScreen} />
        <Tab.Screen name="SearchTab" component={SearchStackScreen} />
        <Tab.Screen name="ProfileTab" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  searchContainer: {
      paddingTop: 210,
      flexGrow: 1,
      backgroundColor: "white",
  },
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 10,
    left: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  listItem: {
    flexDirection: 'row', // Keep flexDirection as row
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    height: 100,
    backgroundColor: "#C9A0DC",
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginLeft: 'auto', // Move the image to the right using marginLeft: 'auto'
    borderRadius: 25,
  },
  imageList: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    left: 10,
    //marginTop: 5,
  },
  ratingDistanceContainerInSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingDistanceContainerInModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    left: 20,
  },
  distanceText: {
    fontSize: 16,
    color: '#3b3b3b',
    marginLeft: 5,
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
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'cover',
  },
  locationTitle: {
    left: 20,
    marginTop: 10,
    fontSize: 36,
    fontWeight: 'bold',
  },
  locationDescription: {
    padding: 20,
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT, 
    ...Platform.select({
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: 60, 
    left: 20,
  },
  eventList: {
    top: 60,
    width: '100%',
  },
});