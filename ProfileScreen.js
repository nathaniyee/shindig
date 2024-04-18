import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const data = [
  {key:'1', value:'Food'},
  {key:'2', value:'Active'},
  {key:'3', value:'Nightlife'},
  {key:'4', value:'Music'},
  {key:'5', value:'Comedy'},
  {key:'6', value:'Art'},
]

export default function ProfileScreen({ navigation }) {
  const [selected, setSelected] = React.useState([])

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        label="General Interests"
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    }
});