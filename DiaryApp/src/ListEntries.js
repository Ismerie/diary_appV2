import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from './config/firebaseConfig';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUser } from "./UserContext"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getEmojiFeeling } from './utils/emote';

export default function ListEntries() {
	const [entries, setEntries] = useState([]);
	const { user } = useUser()
	const userEmail = user?.email;

	const navigation = useNavigation();

	// Récupérer les entrées de Firestore
	useEffect(() => {
		const fetchEntries = async () => {
			if (!userEmail) return; // Ne pas exécuter si l'utilisateur n'est pas connecté

			try {
				// Créer la requête Firestore
				const entriesQuery = query(
					collection(db, "diaryEntries"),
					where("email", "==", userEmail),
					orderBy("date", "desc")
				);

				// Exécuter la requête
				const querySnapshot = await getDocs(entriesQuery);
				console.log(querySnapshot);
				// Mapper les documents dans un tableau
				const fetchedEntries = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));

				setEntries(fetchedEntries);
			} catch (error) {
				console.error('Error fetching entries:', error);
			}
		};

		fetchEntries();
	}, [userEmail]);

	// Supprimer une entrée
	const deleteEntry = async (id) => {
		try {
			await deleteDoc(doc(db, "diaryEntries", id)); // Supprimer l'entrée
			setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id)); // Mettre à jour l'état local
			Alert.alert('Success', 'Entry deleted successfully!');
		} catch (error) {
			console.error('Error deleting entry:', error);
			Alert.alert('Error', 'Could not delete entry. Please try again.');
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={entries}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.entry}>
						<TouchableOpacity 
							style={styles.buttonViewEntry} 
							onPress={() => navigation.navigate('ViewEntryScreen', { entry: item })}
						>
							<Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
							<Text style={styles.title}>{item.title}</Text>
                		</TouchableOpacity>
						<View>
						</View>
						{/* Container pour les boutons, qui les aligne à droite */}
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
		padding: 15,
		borderWidth: 1,
		borderColor: '#f7a072',
		borderRadius: 10,
		flexDirection: 'row', // Permet aux éléments enfants de s'aligner horizontalement
		justifyContent: 'space-between', // Aligne les éléments dans l'espace disponible
		alignItems: 'center', // Centre verticalement les éléments
		width: '100%'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		flex: 1, // Le titre prend l'espace restant
	},
	date: {
		fontSize: 14,
		color: '#F6D5C2',
	},
	buttonViewEntry: {
		padding: 10,
		borderRadius: 5,
	},
	buttonsContainer: {
		flexDirection: 'row', // Aligne les boutons horizontalement
		justifyContent: 'flex-end', // Place les boutons à droite
		alignItems: 'center', // Centre les boutons verticalement
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
