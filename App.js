import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Animated, PanResponder } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-gesture-handler";
import { MultipleSelectList } from 'react-native-dropdown-select-list';


import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';


const myData = [
  { id: 1, name: "Amy's Ice Cream", description: "Amy's Ice Creams is a privately owned chain of ice cream shops in Texas with headquarters in Austin. The Austin Chronicle described Amy's as a \"quintessentially Austin institution\" which \"dominates the local ice cream scene.\" Amy's ice cream is owned by Amy Simmons.", image: require('./images/amyicecream.jpeg')},
  { id: 2, name: 'Blanton Art Museum', description: 'The Jack S. Blanton Museum of Art at the University of Texas at Austin is one of the largest university art museums in the U.S. with 189,340 square feet devoted to temporary exhibitions, permanent collection galleries, storage, administrative offices, classrooms, a print study room, an auditorium, shop, and cafe.', image: require('./images/blanton.jpeg') },
  { id: 3, name: 'Lady Bird Lake', description: 'Lady Bird Lake is a river-like reservoir on the Colorado River in Austin, Texas, United States. The City of Austin created the reservoir in 1960 as a cooling pond for a new city power plant. The lake, which has a surface area of 416 acres, is now used primarily for recreation and flood control.', image: require('./images/lbl.jpeg') },
  { id: 4, name: 'Pizza Press', description: 'Nostalgic restaurant doling out pizza, beer & more in casual, 1920s-style surroundings.', image: require('./images/pizzapress.jpeg') },
  { id: 5, name: 'UT Campus Walk', description: 'Want to explore the 40 acres? Go on this self-guided tour to learn the history behind some of UT Austin/’s most iconic buildings and features', image: require('./images/utcampus.jpeg')},
]

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

  return (
    <ScrollView contentContainerStyle={styles.searchContainer}>
      <View>
        {users.map((user, idx) => (
          <TouchableOpacity style={styles.listItem} key={idx} onPress={()=> handleLocationPress(user)}>
            <Text style={styles.searchText}>{user.name}</Text>
            <View style={styles.imageContainer}>
              <Image style={styles.imageList} source={user.image}/>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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

  return (
    <ScrollView contentContainerStyle={styles.container} backgroundColor='white'>
        <Image style={styles.image} source={location.image}/>
        <Text style={styles.locationTitle}>{location.name}</Text>
        <Text style={styles.locationDescription}> {location.description}</Text>
    </ScrollView>
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
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
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
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'purple',
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