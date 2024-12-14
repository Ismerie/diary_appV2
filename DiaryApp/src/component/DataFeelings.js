import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet} from 'react-native';
import { useUser } from "../UserContext"
import { getEmojiFeeling } from '../utils/emote';


export default function ListEntries() {
    const [feelingsPercentages, setFeelingsPercentages] = useState({}); // Les pourcentages des feelings
    const { user, entries} = useUser();
    const userEmail = user?.email

    const fetchEntriesAndCalculateFeelings = async () => {
        if (!entries) return ;
        if (!userEmail) return; // Ne pas exécuter si l'utilisateur n'est pas connecté

    try {
        const feelingsCount = {
            happy: 0,
            inlove: 0,
            laughing: 0,
            sad: 0,
            chocked: 0,
            angry: 0,
        };

        entries.forEach((entry) => {
        if (feelingsCount[entry.feeling] !== undefined) {
            feelingsCount[entry.feeling]++;
        }
        });

        const totalEntries = entries.length;
        const feelingsPercentage = {};

        for (const feeling in feelingsCount) {
        feelingsPercentage[feeling] = totalEntries
            ? ((feelingsCount[feeling] / totalEntries) * 100).toFixed(0)
            : 0;
        }
        
        setFeelingsPercentages(feelingsPercentage); // Les pourcentages des feelings
    } catch (error) {
        console.error("Error fetching entries:", error);
    }
    };

    useEffect(() => {
        fetchEntriesAndCalculateFeelings();
    }, []);

    useEffect(() => {
    
        fetchEntriesAndCalculateFeelings();
    }, [userEmail, entries]);
    
	return (
        <View style={styles.container}>
            <View style={styles.containerFeeling}>
                {/* Première ligne : 3 premiers sentiments */}
                {Object.entries(feelingsPercentages)
                    .slice(0, 3) // Prend les trois premiers
                    .map(([feeling, percentage]) => (
                        <View key={feeling} style={styles.containerOneFeel}>
                            <Text style={styles.emoji}>{getEmojiFeeling(feeling)}</Text>
                            <Text style={styles.textPercentage}>{percentage}%</Text>
                        </View>
                    ))}
            </View>
    
            <View style={styles.containerFeeling}>
                {/* Deuxième ligne : 3 derniers sentiments */}
                {Object.entries(feelingsPercentages)
                    .slice(3) // Prend les trois suivants
                    .map(([feeling, percentage]) => (
                        <View key={feeling} style={styles.containerOneFeel}>
                            <Text style={styles.emoji}>{getEmojiFeeling(feeling)}</Text>
                            <Text style={styles.textPercentage}>{percentage}%</Text>
                        </View>
                    ))}
            </View>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center', // Centre les lignes verticalement
            alignItems: 'center', // Centre les lignes horizontalement
        },
        containerFeeling: {
            flexDirection: 'row',
            justifyContent: 'space-around', // Espace uniforme entre les éléments
            width: '100%', // Chaque ligne prend toute la largeur
            marginBottom: 20, // Espace entre les lignes
        },
        containerOneFeel: {
            flex: 1,
            alignItems: 'center', // Centre les éléments dans une colonne
        },
        emoji: {
            fontSize: 30,
        },
        textPercentage: {
            fontSize: 20, // Taille du texte légèrement réduite
        },
    });
    
