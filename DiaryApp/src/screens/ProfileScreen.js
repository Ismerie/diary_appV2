import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../config/firebaseConfig";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";

import ListEntries from '../ListEntries';
import DataFeelings from '../component/DataFeelings';

export default function ProfileScreen({ navigation }) {
    const { user, entries, setEntries, setSelectedDate, setUser } = useUser();
    const userName = user?.displayName;
    const userEmail = user?.email;
    const db = getFirestore();

    const handleButtonLogOut = () => {
        auth.signOut()
        .then(() => {
            setEntries([])
            setSelectedDate(new Date().toISOString().split('T')[0])
            setUser(null)
            navigation.navigate("LoginScreen");
        })
        .catch((error) => {
            console.error("Erreur lors de la déconnexion :", error);
        });
    };

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

    useEffect(() => {
        fetchEntries();
    }, [userEmail])    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{userName}</Text>
                <TouchableOpacity style={styles.buttonLogOut} onPress={handleButtonLogOut}>
                    <Ionicons name="power-outline" size={24} color="#f7a072" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.titleContainer, {marginTop: 20}]}>Your feel for your <Text style={{color: '#f7a072', fontWeight: '600'}}>{entries.length}</Text> entries</Text>
                <DataFeelings />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.titleContainer}>Your last diary entries</Text>
                <View style={{marginTop: 15, flex: 1}}>
                    <ListEntries newEntries={entries.slice(0,2)} nameRedirect="ProfileScreen"/>
                </View>
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
        marginTop: 10,
        backgroundColor: '#eddea4',
        borderRadius: 10,
        padding: 20,
        width: "100%",
        elevation: 6,
    },
    fontButton: {
        fontSize: 24,
        textAlign: 'center',
    },
    titleContainer: {
        fontSize: 25,
        fontWeight: 400,
        alignSelf: 'start'
    }
});
