import React from 'react';
import { ScrollView, StyleSheet, Button, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';


const Card = () => {
   return (
       <View style={styles.card}>
       <ImageBackground source={require('../images/amyicecream.jpeg')} style={styles.exploreImg} />
       <View style={styles.cardInner}>
       <Text style={styles.name}>Amy's Ice Cream</Text>
       </View>
       <Text style={styles.text}>Explore</Text>
       </View>
   );
};


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
 });


export default Card;