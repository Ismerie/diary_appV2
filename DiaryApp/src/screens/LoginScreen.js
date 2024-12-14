import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, ImageBackground, View } from 'react-native';
import { auth, google_client } from "../config/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { useUser } from "../UserContext"
import { Ionicons } from '@expo/vector-icons';
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth"


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {
	const { user, setUser } = useUser();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: google_client.android,
		webClientId: google_client.web,
	});

	useEffect(() => {
        if (response?.type === "success") {
            const { idToken } = response.authentication;
            const credential = GoogleAuthProvider.credential(idToken);
            signInWithCredential(auth, credential)
            .then(() => navigation.replace('ProfileScreen'))
            .catch((err) => {
                console.error(err);
                Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
            });
        }
    }, [response]);

	useEffect(() => {
		// Si un utilisateur est authentifié, on navigue vers ProfileScreen
		if (user) {
			navigation.replace('ProfileScreen');
		}
	}, [user]);

	return (
		<ImageBackground
            source={require('../../assets/background.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
			<SafeAreaView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Open your <Text style={{color: '#f7a072'}}>Diary</Text></Text>
				</View>
				{/* Bouton Google */}
				<TouchableOpacity style={styles.buttonLogin} onPress={() => promptAsync()}>
					<View style={styles.buttonContent}>
						<Text style={styles.fontButton}>Login with </Text>
						<Ionicons name="logo-google" size={30} color="black" style={styles.icon} />
					</View>	
				</TouchableOpacity>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 20,
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',      
	},
	title: {
		fontSize: 50,
		textAlign: 'center',
		marginBottom: 20,
	},
	buttonLogin: {
		backgroundColor: '#eddea4',
		padding: 15,
		borderRadius: 10,
		width: '100%',
		alignSelf: 'center',
		elevation: 5,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
	},
	icon: {
		textAlign: 'center',
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	fontButton: {
        fontSize: 24,
        textAlign: 'center',
    }
});
