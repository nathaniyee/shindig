// import React from "react";
// import { useState } from "react";
// import { ScrollView, Text, View, StyleSheet, SafeAreaView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SearchBar } from "react-native-elements";

// const myData = [
//   { id: 1, name: "Amy's Ice Cream", description: "Amy's Ice Creams is a privately owned chain of ice cream shops in Texas with headquarters in Austin. The Austin Chronicle described Amy's as a \"quintessentially Austin institution\" which \"dominates the local ice cream scene.\" Amy's ice cream is owned by Amy Simmons.", image: require('./images/amyicecream.jpeg')},
//   { id: 2, name: 'Blanton Art Museum', description: 'The Jack S. Blanton Museum of Art at the University of Texas at Austin is one of the largest university art museums in the U.S. with 189,340 square feet devoted to temporary exhibitions, permanent collection galleries, storage, administrative offices, classrooms, a print study room, an auditorium, shop, and cafe.', image: require('./images/blanton.jpeg') },
//   { id: 3, name: 'Lady Bird Lake', description: 'Lady Bird Lake is a river-like reservoir on the Colorado River in Austin, Texas, United States. The City of Austin created the reservoir in 1960 as a cooling pond for a new city power plant. The lake, which has a surface area of 416 acres, is now used primarily for recreation and flood control.', image: require('./images/lbl.jpeg') },
//   { id: 4, name: 'Pizza Press', description: 'Nostalgic restaurant doling out pizza, beer & more in casual, 1920s-style surroundings.', image: require('./images/pizzapress.jpeg') },
//   { id: 5, name: 'UT Campus Walk', description: 'Want to explore the 40 acres? Go on this self-guided tour to learn the history behind some of UT Austin/’s most iconic buildings and features', image: require('./images/utcampus.jpeg')},
// ]

// export default function SearchScreen({ navigation }) {
//   navigation = useNavigation();

//   const handleLocationPress = (location) => {
//     navigation.navigate('LocationDetails', { location });
//   }

//   const [users, setUsers] = React.useState(myData);
//   const [originalUsers, setOriginalUsers] = React.useState(myData);

//   React.useEffect(() => {
//     navigation.setOptions({
//       headerLargeTitle: true,
//       headerSearchBarOptions: {
//         placeHolder: 'Search',
//         onChangeText: (event) => {
//           handleFilter(event.nativeEvent.text);
//         },
//         onCancel: () => {
//           handleCancel();
//         },
//       }
//     });
//   }, [navigation]);

//   function handleFilter(searchTerm) {
//     if (searchTerm.trim() === '') {
//       setUsers(originalUsers);
//       setOriginalUsers(originalUsers);
//     }
//     else {
//       const filteredUsers = originalUsers.filter((user) =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setUsers(filteredUsers);
      
//     }
//   }

//   function handleCancel() {
//     setUsers(originalUsers);
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.searchContainer}>
//       <View>
//         {users.map((user, idx) => (
//           <TouchableOpacity style={styles.listItem} key={idx} onPress={()=> handleLocationPress(user)}>
//             <Text style={styles.searchText}>{user.name}</Text>
//             <View style={styles.imageContainer}>
//               <Image style={styles.imageList} source={user.image}/>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }


// function LocationDetailsScreen({ route, navigation }) {
//   const { location } = route.params;

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerBackTitleVisible: false,
//       headerTitle:'',
//     });
//   }, [navigation]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//         <Image style={styles.image} source={location.image}/>
//         <Text style={styles.locationTitle}>{location.name}</Text>
//         <Text style={styles.locationDescription}> {location.description}</Text>
//     </ScrollView>
//   );
// }

// // export default function SearchScreen() {
// //   const [search, setSearch] = React.useState("");
// //   const navigation = useNavigation();



// //   React.useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerLargeTitle: true,
// //     });
// //   }, [navigation]);

// //   const updateSearch = (search) => {
// //     setSearch(search);
// //   }




// //   return (
// //     <SafeAreaView>
// //       <SearchBar
// //         platform="ios"
// //         placeholder="Search"
// //         onChangeText={updateSearch}
// //         value={search}
// //       />
// //     </SafeAreaView>

// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //       flex: 1,
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //   },
// //   text: {
// //       fontSize: 32,
// //       fontWeight: 'bold',
// //   }
// // });


