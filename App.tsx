import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { object, string, date, boolean } from 'yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReminderCard from './src/ReminderCard';
import astro from "./assets/images/astro.jpg"
import LottieView from 'lottie-react-native';

const validationSchema = object({
  name: string().required('Title is required').min(6, 'Name must be at least 6 characters').max(30, 'Name must not exceed 30 characters'),
  desc: string().required('Description is required').min(10, 'Description must be at least 10 characters').max(80, 'Description must not exceed 80 characters'),
  createdOn: date().default(() => new Date()),
  completed: boolean().default(false),
});
const App = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [allValues, setAllValues] = useState([]);
  const [made, setMade] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [showAnime,setShowAnime] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setShowAnime(false);
    },1500)
    const getData = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const allItems = await AsyncStorage.multiGet(allKeys);
      const arry = allItems.slice(0, -1)
      console.log(arry);

      const editTodo = arry.map(([key, value]) => {

        try {
          console.log("In try")
          return JSON.parse(value);
        } catch (error) {
          console.error('Error parsing JSON for key:', 'Error:', error);
          return null;
        }
      });
      editTodo.reverse();
      console.log('All Values:', allValues);
      setAllValues(editTodo);
    };
    getData();
  }, [made, shouldRender]);

  const handleChildRequest = () => {
    // Update the state when the child requests a re-render
    setShouldRender(!shouldRender);
  };

  // if(allValues.length===0){
  //   return <Text style={styles.subheading}>Not done</Text>
  // }


  console.log(allValues.length)
  const handleReminder = async () => {
    console.log('Clicked');
    try {
      await validationSchema.validate({ name, desc });
      const id = uuid.v4();
      const todos = {
        name,
        desc,
        date: new Date(),
        completed: false,
        id: id,
      };
      await AsyncStorage.setItem(id, JSON.stringify(todos));
      console.log('Data saved successfully.');
      Alert.alert('Success', 'Saved reminder');
      console.log(todos);
      setMade((prev) => !prev)
    } catch (error) {
      Alert.alert('Validation error', error.message);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      {!showAnime ? (
        <View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>A daily set of</Text>
            <Text style={styles.blueText}>reminder</Text>
          </View>
          <View style={styles.subWrapper}>
            <Text style={styles.subheading}>Add a reminder</Text>
            <TextInput style={styles.input} value={name} placeholder="Enter title" onChangeText={(text) => setName(text)} placeholderTextColor="white" />
            <TextInput style={styles.input} value={desc} placeholder="Enter Description" onChangeText={(text) => setDesc(text)} placeholderTextColor="white" />
            <TouchableOpacity style={styles.button} onPress={handleReminder}><Text style={styles.buttonText}>Create a reminder</Text></TouchableOpacity>
          </View>
          {allValues && allValues.map((item) => (
            <View key={item.id}>
              <ReminderCard item={item} onRequestRender={handleChildRequest} />
            </View>
          ))}
        </View>
      ) : (
        <View>
          {allValues.length === 0 ? (
            <View style={styles.bottomImageContainer}>
              <Image source={astro} style={styles.image} />
              <View style={styles.worry}>
                <Text style={styles.heading}>No tasks, nothing to</Text>
                <Text style={styles.worryText}>worry</Text>
              </View>
            </View>
          ) : null}
         <View style={{ flex: 1,justifyContent:'flex-end',alignItems:'center'}}>
         <LottieView source={require('./assets/animations/welocme.json') } style={styles.welcome} autoPlay loop speed={2.5}/>
         <Image source={astro} style={styles.image} />
         </View>
        </View>
      )}
    </ScrollView>
  );
  // 
};

export default App;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'black',
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  heading: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
    alignSelf: 'center',
    margin: 10,
  },
  blueText: {
    color: '#3467eb',
    fontWeight: '700',
    fontSize: 22,
  },
  subWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  subheading: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 12,
    color: 'white',
  },
  input: {
    borderWidth: 1, // Add borderWidth to make the border visible
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    marginTop: 30,
    height: 50,
    width: 300,
    padding: 8,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    marginVertical: 26,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
  },
  bottomImageContainer: {
    justifyContent: 'flex-end', // Align the image at the bottom of the screen
    alignItems: 'center',
    marginBottom: 20, // Adjust the margin as needed
  },
  image: {
    marginTop: 300,
    height: 90,
    width: 90,
    borderRadius: 50,
    alignSelf: 'center',
  },
  worry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  worryText: {
    color: 'green',
    fontSize: 22,
    fontWeight: '700',

  },
  welcome:{
    height:300,
    width:300,
   alignSelf:'center'
   
  }
});
