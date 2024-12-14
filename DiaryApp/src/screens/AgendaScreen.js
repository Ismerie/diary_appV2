import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { db } from '../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { getStrFeeling } from '../utils/emote';



export default function AddDiaryEntry({ navigation }) {
	console.log("Screen Agenda")

	return (
		<View style={styles.container}>
			<Text>Page Agenda</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between',
        backgroundColor: 'pink',
	},
});
