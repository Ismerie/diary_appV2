import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db } from '../config/firebaseConfig'; // Votre configuration Firebase
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useUser } from '../UserContext';
import ListEntries from '../ListEntries';

export default function AgendaScreen() {
    const { user, entries, selectedDate, setSelectedDate } = useUser();
	const [entriesDisplay, setEntriesDisplay] = useState(entries.filter(entry => entry.date.split('T')[0] == selectedDate))

    // Appeler fetchEntries chaque fois que la date sélectionnée change
    useEffect(() => {
		setEntriesDisplay(entries.filter(entry => entry.date.split('T')[0] == selectedDate));
    }, [selectedDate, entries]);

    return (
        <View style={styles.container}>
            {/* Affichage du calendrier */}
			<View style={{flex: 1}}>
				<Calendar
					current={selectedDate}
					onDayPress={(day) => setSelectedDate(day.dateString)}
					markedDates={{
						[selectedDate]: { selected: true, marked: true, selectedColor: '#f7a072' },
					}}
					theme={{
						todayTextColor: '#f7a072',
						calendarBackground: 'transparent',
						
					}}
				/>
			</View>
			<View style={{flex: 1}}>
				<ListEntries newEntries={entriesDisplay} nameRedirect="AgendaScreen"/>
			</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 25,
    },
    entryContainer: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    entryDescription: {
        fontSize: 14,
        color: '#555',
    },
    deleteText: {
        color: '#ff4444',
        fontWeight: 'bold',
    },
    noEntriesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});
