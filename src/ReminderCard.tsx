import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import anime from "../assets/animations/congrats.json"


const ReminderCard = ({ item, onRequestRender }) => {
    const [done, setDone] = useState(false);
    const [count,setCount] = useState(true);
    const handleDone = () => {
        setDone((prev) => !prev);
    };

    const removeHandler = async () => {
        try {
            await AsyncStorage.removeItem(item.id);
            console.log('Removed');
            onRequestRender();
        } catch (error) {
            console.log(error);
        }
    };
    console.log(done);
    return (
        <View style={[styles.card, done && styles.complete]}>

            <View style={[styles.view]}>
                <Text style={styles.text}>Created on - {item.date.substring(0, 10)}</Text>
                <Text style={[styles.done, done && styles.undone]} onPress={handleDone}>{done ? 'Undone' : 'Done'}</Text>
            </View>
            <View>
                <Text style={styles.text} >Title - {item.name}</Text>
                <Text style={styles.text} >Description - {item.desc}</Text>
                <Text style={styles.remove} onPress={removeHandler}>Remove</Text>
            </View>
            {done && <LottieView source={anime} style={[styles.lottieAnim,!count && styles.anime]} autoPlay />}
                    </View>
                );
            };

export default ReminderCard;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    card: {
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        padding: 9,
        borderRadius: 12,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    done: {
        fontWeight: '700',
        color: 'green',
    },
    undone: {
        color: 'red',
    },
    complete: {
        borderColor: 'green',
    },
    remove: {
        color: '#348ceb',
        marginVertical: 5,
        fontWeight: '800',
    },
    lottieAnim: {
        height:350,
        width:400,
        position: 'absolute',
        top: -400, // Adjust as needed // Adjust as needed
        // transform: [{ scale: 1.1 }], // Adjust scale as needed
        // blurRadius: 5,// Adjust as needed
      },
      anime:{
        display:'none'
      }
});
