import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../config/firebaseConfig";

import ListEntries from '../ListEntries';

export default function ProfileScreen({ navigation }) {
    const { user, setUser } = useUser();

    const handleButtonLogOut = () => {
        auth.signOut()
        .then(() => {
            navigation.navigate("LoginScreen");
        })
        .catch((error) => {
            console.error("Erreur lors de la déconnexion :", error);
        });
    };

    return (
        <View style={styles.container}>
            {/* Barre supérieure contenant le bouton de déconnexion et le titre */}
            <View style={styles.header}>
                <Text style={styles.title}>your notes</Text>
                <TouchableOpacity style={styles.buttonLogOut} onPress={handleButtonLogOut}>
                    <Ionicons name="power-outline" size={24} color="#f7a072" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <ListEntries />
                <TouchableOpacity 
                    style={styles.buttonNewEntry} 
                    onPress={() => navigation.navigate("AddEntryScreen")}
                >
                    <Text style={styles.fontButton}>New note</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        height: 80,
        paddingHorizontal: 10,
    },
    buttonLogOut: {
        backgroundColor: '#f9f7f3',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
        alignSelf: 'flex-start',
    },
    title: { 
        fontSize: 40, 
        fontWeight: '600',
    },
    buttonNewEntry: {
        backgroundColor: '#eddea4',
        borderRadius: 10,
        padding: 20,
        width: "100%",
        elevation: 6,
    },
    fontButton: {
        fontSize: 24,
        textAlign: 'center',
    }
});
