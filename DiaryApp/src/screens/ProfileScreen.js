import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { FlatList } from 'react-native-gesture-handler';

import ListEntries from '../ListEntries';

export default function ProfileScreen({ navigation}) {
    const { user, setUser } = useUser();
//   const { token } = route.params; // Token ou données envoyées lors de la navigation

    return (
        <View style={styles.container}>
            <Text style={styles.title}>your notes</Text>
            <View style={{flex: 1}}>
                <ListEntries />
                <TouchableOpacity style={styles.buttonNewEntry} onPress={() => navigation.navigate("AddEntryScreen")}>
                        <Text style={styles.fontButton}>New note</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 40,
    },
    title: { 
        fontSize: 40, 
        marginBottom: 20,
        fontWeight: 600,
        textAlign: 'start',
    },
    buttonNewEntry: {
        backgroundColor: '#eddea4',
        borderRadius: 10,
        padding: 20,
        width: "100%",
    },
    fontButton: {
        fontSize: 24,
        textAlign: 'center'
    }
});
