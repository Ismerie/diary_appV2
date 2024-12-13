import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEmojiFeeling } from '../utils/emote';

export default function ViewEntryScreen({ navigation, route }) {
	const { entry } = route.params;

return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('ProfileScreen')}>
				<Ionicons name="arrow-back-outline" size={30} color="black" style={styles.icon} />
			</TouchableOpacity>
			<View>
				<Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text>
				<Text style={styles.title}>{entry.title}</Text>
				<Text style={styles.feeling}>{getEmojiFeeling(entry.feeling)}</Text>
				<Text style={styles.content}>{entry.content}</Text>
			</View>
		</View>
);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f7a072',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'start'
	},
	date: {
		fontSize: 14,
		color: '#F6D5C2',
		marginBottom: 20,
		textAlign: 'right',
	},
	feeling: {
		fontSize: 25,
		marginBottom: 20,
	},
	content: {
	fontSize: 18,
	},
});
