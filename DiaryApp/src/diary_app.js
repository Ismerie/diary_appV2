import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUser } from './UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./config/firebaseConfig";

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ViewEntryScreen from './screens/ViewEntryScreen';
import AddEntryScreen from './screens/AddEntryScreen';

const Stack = createStackNavigator();

function AppNavigator() {
	const { user, setUser } = useUser(null); 

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				console.log('User signed in:', currentUser.email);
				setUser(currentUser);
			} else {
				console.log('No user is signed in');
				setUser(null);
			}
		});
	
		// Cleanup the subscription
		return () => unsubscribe();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator
					initialRouteName={user ? "ProfileScreen" : "LoginScreen"}
					screenOptions={({ route, navigation }) => ({
				headerShown: false,
					})}
			>
					<Stack.Screen name="LoginScreen" component={LoginScreen} />
					<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
					<Stack.Screen name="ViewEntryScreen" component={ViewEntryScreen} />
					<Stack.Screen name="AddEntryScreen" component={AddEntryScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
		}

export default function App() {

	useEffect(() => {
		if (Platform.OS != 'web') {
			NavigationBar.setVisibilityAsync('hidden');
			NavigationBar.setBackgroundColorAsync('transparent');
			NavigationBar.setBehaviorAsync('overlay-swipe');
		}
	}, []);

	// Si l'utilisateur est connecté, il est redirigé vers ProfileScreen, sinon vers LoginScreen
	return (
			<UserProvider>
				<AppNavigator />
			</UserProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'pink'
	},
});
