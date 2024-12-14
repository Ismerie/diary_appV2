import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomBar() {
    const [focusProfile, setFocusProfile] = useState(true);
    const [focusAgenda, setFocusAgenda] = useState(false);
    const navigation = useNavigation();

    const handleButtonProfile = () => {
        setFocusProfile(true);
        setFocusAgenda(false);
        navigation.navigate("ProfileScreen")
    }

    const handleButtonAgenda = () => {
        setFocusProfile(false);
        setFocusAgenda(true);
        navigation.navigate("AgendaScreen")
    }

    return (
        <SafeAreaView style={{ padding: 3 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleButtonProfile}>
                    <View style={styles.containerButton}>
                        <Ionicons 
                            name={focusProfile ? "person" : "person-outline"} 
                            size={30} 
                            color={focusProfile ? "#f7a072" : "black"} 
                            style={styles.icon} 
                        />
                        <Text style={styles.buttonText}>Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleButtonAgenda}>
                    <View style={styles.containerButton}>
                        <Ionicons 
                            name={focusAgenda ? "calendar" : "calendar-outline"} 
                            size={30} 
                            color={focusAgenda ? "#f7a072" : "black"} 
                            style={styles.icon} 
                        />
                        <Text style={styles.buttonText}>Agenda</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent', // Rendre le fond transparent pour que toute la zone soit cliquable
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
    },
    icon: {
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    }
});
