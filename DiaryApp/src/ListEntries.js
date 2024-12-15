import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from './config/firebaseConfig';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUser } from "./UserContext"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getEmojiFeeling } from './utils/emote';

export default function ListEntries({newEntries, nameRedirect}) {
	const { user, setEntries } = useUser();
	const userEmail = user?.email;
	const navigation = useNavigation();

	const deleteEntry = async (id) => {
		try {
			await deleteDoc(doc(db, "diaryEntries", id)); // Supprimer l'entrée
			setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id)); // Mettre à jour l'état local
		} catch (error) {
			console.error('Error deleting entry:', error);
			Alert.alert('Error', 'Could not delete entry. Please try again.');
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={newEntries}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.entry}>
						<TouchableOpacity 
							style={styles.buttonViewEntry} 
							onPress={() => navigation.navigate('ViewEntryScreen', { entry: item, nameRedirect })}
						>
							<Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
							<Text style={styles.title}>{item.title}</Text>
						</TouchableOpacity>
						<View style={styles.buttonsContainer}>
							<Text style={styles.emote}>{getEmojiFeeling(item.feeling)}</Text>
							<TouchableOpacity style={styles.buttonDelete} onPress={() => deleteEntry(item.id)}>
								<Ionicons name="trash-outline" size={22} color="#F6D5C2" style={styles.icon} />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	entry: {
		backgroundColor: '#f7a072',
		marginBottom: 20,
		padding: 10,
		borderWidth: 1,
		borderColor: '#f7a072',
		borderRadius: 10,
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
		width: '100%',
		elevation: 3,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		flex: 1,
	},
	date: {
		fontSize: 14,
		color: '#F6D5C2',
	},
	buttonViewEntry: {
		padding: 10,
		borderRadius: 5,
		flex: 1
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end', 
		alignItems: 'center',
	},
	buttonDelete: {
		padding: 10,
		borderRadius: 5,
	},
	fontButton: {
		color: 'white',
		fontSize: 16,
	},
	emote: {
		fontSize: 25,
		marginRight: 10,
	}
});
