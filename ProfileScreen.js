import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import based on the icon set you choose
import { Slider } from 'react-native-elements/dist/slider/Slider';
import SwitchSelector from "react-native-switch-selector"
import { Livvic_100Thin } from '@expo-google-fonts/livvic';


const MultiSelectButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [budget, setBudget] = useState(0); // Initial budget value
  const [proximity, setProximity] = useState(5); 
  const [showHide, setShowHide] = useState(false)

  // Function to toggle button selection
  const toggleButton = (buttonId) => {
    setSelectedButtons((prevSelected) => {
      if (prevSelected.includes(buttonId)) {
        // If button is already selected, remove it from the list
        return prevSelected.filter((id) => id !== buttonId);
      } else {
        // If button is not selected, add it to the list
        return [...prevSelected, buttonId];
      }
    });
  };
  

  return (   
    <View style={styles.container}>
      <View style = {styles.profileContainer}>
        <View style = {styles.circle}>
          <Image style = {styles.img} source={require('./images/user.png')}/>
        </View>
        <Text style={styles.name}>Elaine Jorden</Text> 
        <Text style={styles.caption}>Joined: February 2024</Text>
      </View>
      <View style={styles.purpleRectangle}>
      <Slider
          style={styles.slider}
          thumbStyle={styles.thumbStyle}
          minimumValue={0}
          maximumValue={100}
          step={10}
          value={budget}
          onValueChange={(value) => setBudget(value)}
      />
       <Text style={styles.budgetText}>Budget: ${budget}</Text>
      <Slider
          style={styles.slider}
          thumbStyle={styles.thumbStyle}
          minimumValue={0}
          maximumValue={100}
          step={5}
          value={proximity}
          onValueChange={(value) => setProximity(value)}
      />
      <Text style={styles.budgetText}>Proximity: {proximity} miles</Text>
      <SwitchSelector
          initial = {0}
          textColor = "black"
          height = {50}
          onPress = {value => setShowHide(value)}
          options={[
            {label: 'Indoor', value: true},
            {label: 'Outdoor', value: false},
          ]}
          style = {styles.switch}
          buttonColor="#7D2DA1"
        />
      </View>
      <Text style={styles.title}>General Interests</Text> 
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(1) && styles.selectedButton]}
          onPress={() => toggleButton(1)}
        >
          <Icon name="cutlery" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(2) && styles.selectedButton]}
          onPress={() => toggleButton(2)}
        >
          <Icon name="bicycle" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(3) && styles.selectedButton]}
          onPress={() => toggleButton(3)}
        >
          <Icon name="glass" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Nightlife</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(4) && styles.selectedButton]}
          onPress={() => toggleButton(4)}
        >
          <Icon name="paint-brush" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Art</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(5) && styles.selectedButton]}
          onPress={() => toggleButton(5)}
        >
          <Icon name="music" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(6) && styles.selectedButton]}
          onPress={() => toggleButton(6)}
        >
          <Icon name="smile-o" size={30} color="#C9A0DC" /> 
          <Text style={styles.buttonText}>Comedy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    color: '#5F5F5F',
    marginTop: 20,
    fontSize: 10,
  },
  profileContainer: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',

  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  purpleRectangle: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 400,
    height: 220,
    borderRadius: 25,
    backgroundColor: '#EADAF2',
  },
  slider: {
    left: '10%',
    width: '80%',
    marginBottom: 2,
  },
  switch: {
    marginTop: 10,
    left: '15%',
    width: '80%',
  },
  budgetText: {
    color: 'black',
    fontSize: 16,
    left: '10%',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  name:{
    fontSize: 25,
    marginTop: 10,
  },
  circle: {
    height: 149,
    width: 149,
    borderRadius: 74.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C9A0DC"
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 76.78,
    height: 87.74,
    borderWidth: 2,
    borderColor: 'lightgray',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: '#7D2DA1',
  },
  buttonText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
  img:{
    height: 117,
    width: 117,
    borderRadius: 58.5,
  },
  thumbStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#C9A0DC', // Customize the color as needed
  },  
});

export default MultiSelectButtons;
