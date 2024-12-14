import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { db } from '../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { getStrFeeling } from '../utils/emote';

const feelings = [
	'😄',
	'😍',
	'😂',
	'😢',
	'😮',
	'😡',
];

export default function AddDiaryEntry({ navigation }) {
	const [title, setTitle] = useState('');
	const [feeling, setFeeling] = useState(getStrFeeling(feelings[0]));
	const [content, setContent] = useState('');
	const { user } = useUser();
	const userEmail = user?.email;

	const addEntry = async () => {
		try {
			if (!title || !feeling || !content) {
				Alert.alert('Error', 'Please fill in all fields');
				return;
			}

			const entriesCollection = collection(db, 'diaryEntries');
			await addDoc(entriesCollection, {
				email: userEmail,
				date: new Date().toISOString(),
				title,
				feeling,
				content,
			});

			Alert.alert('Success', 'Entry added!');
			setTitle('');
			setFeeling('');
			setContent('');
			navigation.navigate('ProfileScreen');
		} catch (error) {
			console.error('Error adding entry:', error);
			Alert.alert('Error', 'Could not add entry. Please try again.');
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('ProfileScreen')}>
				<Ionicons name="arrow-back-outline" size={30} color="black" />
			</TouchableOpacity>
			<Text style={styles.titleScreen}>Create a new note</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Title"
					value={title}
					onChangeText={setTitle}
				/>
				<View style={styles.feelingsContainer}>
					{feelings.map(icon => (
						<TouchableOpacity
							key={icon}
							style={[
								styles.feelingIcon,
								feeling === getStrFeeling(icon) && styles.selectedFeeling, // Applique le style si sélectionné
							]}
							onPress={() => setFeeling(getStrFeeling(icon))} // Met à jour l'état feeling
						>
							<Text style={[styles.icon, feeling === getStrFeeling(icon) && styles.selectedIcon]}>
								{icon}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<TextInput
					style={styles.textArea}
					placeholder="Content"
					value={content}
					onChangeText={setContent}
					multiline
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.buttonNewEntry} onPress={addEntry}>
					<Text style={styles.fontButton}>Save</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between',
	},
	buttonBack: {
		alignSelf: 'flex-start',
	},
	titleScreen: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: '600',
		marginBottom: 15,
	},
	inputContainer: {
		flex: 1,
	},
	input: {
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
		fontSize: 25,
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	feelingsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	feelingIcon: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		backgroundColor: '#f0f0f0',
		margin: 5,
	},
	selectedFeeling: {
		backgroundColor: '#eddea4',
	},
	textArea: {
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		flex: 1,
		fontSize: 20,
		borderWidth: 1,
		textAlignVertical: 'top',
	},
	buttonContainer: {
		paddingVertical: 10,
	},
	buttonNewEntry: {
		backgroundColor: '#eddea4',
		borderRadius: 10,
		padding: 15,
		width: '100%',
		elevation: 6,
	},
	fontButton: {
		fontSize: 24,
		textAlign: 'center',
	},
	feelingsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    feelingIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#f0f0f0', // Couleur par défaut
        margin: 5,
    },
    selectedFeeling: {
        backgroundColor: '#eddea4', // Couleur de fond pour l'icône sélectionnée
    },
    icon: {
        fontSize: 24,
        color: 'black', // Couleur par défaut de l'icône
    },
    selectedIcon: {
        color: 'white', // Change la couleur de l'icône lorsqu'elle est sélectionnée
    },
});
