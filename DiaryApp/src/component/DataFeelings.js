import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet} from 'react-native';
import { useUser } from "../UserContext"
import { getEmojiFeeling } from '../utils/emote';
import { BarChart } from "react-native-gifted-charts";


export default function ListEntries() {
    const [feelingsPercentages, setFeelingsPercentages] = useState({}); // Les pourcentages des feelings
    const { user, entries} = useUser();
    const userEmail = user?.email

    const CappedBars = () => {
        const barData = Object.entries(feelingsPercentages)
        .map(([feeling, percentage]) => ({
            value: parseInt(percentage, 10), // Utilise le pourcentage comme valeur // Utilise l'émoji comme label
            topLabelComponent: () => (
                <>
                    <Text style={{ fontSize: 25, marginBottom: 6, padding: 1}}>{getEmojiFeeling(feeling)}</Text>
                </>
            ),
        }));
        
        return (
        <View style={styles.chartContainer} >
            <BarChart
                data={barData}
                cappedBars
                capColor={'rgba(78, 0, 142)'}
                showGradient
                gradientColor={'rgba(247, 160, 114, 0.9)'}
                frontColor={'rgba(237, 222, 164, 0.4)'}
                hideYAxisText
                xAxisThickness={0}
                yAxisThickness={0}
                hideRules
                height={120}
                barWidth={40}
                yAxisExtraHeight={40}
                
            />
        </View>
        );
    };
    

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
            <CappedBars/>
        </View>
    );
}

    const styles = StyleSheet.create({
        chartContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            
        },
    });
    
