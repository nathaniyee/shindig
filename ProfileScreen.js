import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import based on the icon set you choose

const MultiSelectButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

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
      <Text style={styles.title}>General Interest</Text> 
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(1) && styles.selectedButton]}
          onPress={() => toggleButton(1)}
        >
          <Icon name="cutlery" size={30} color="black" /> 
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(2) && styles.selectedButton]}
          onPress={() => toggleButton(2)}
        >
          <Icon name="bicycle" size={30} color="black" /> 
          <Text style={styles.buttonText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(3) && styles.selectedButton]}
          onPress={() => toggleButton(3)}
        >
          <Icon name="glass" size={30} color="black" /> 
          <Text style={styles.buttonText}>Nightlife</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(4) && styles.selectedButton]}
          onPress={() => toggleButton(4)}
        >
          <Icon name="paint-brush" size={30} color="black" /> 
          <Text style={styles.buttonText}>Art</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(5) && styles.selectedButton]}
          onPress={() => toggleButton(5)}
        >
          <Icon name="music" size={30} color="black" /> 
          <Text style={styles.buttonText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButtons.includes(6) && styles.selectedButton]}
          onPress={() => toggleButton(6)}
        >
          <Icon name="smile-o" size={30} color="black" /> 
          <Text style={styles.buttonText}>Comedy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderColor: '#B973DA',
  },
  buttonText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MultiSelectButtons;
