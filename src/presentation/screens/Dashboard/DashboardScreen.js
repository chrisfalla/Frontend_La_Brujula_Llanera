import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import CustomSearch from '../../components/Search/Search';
import HorizontalCardPlace from '../../components/HorizontalCardPlace/HorizontalCardPlace';

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <NavigationTopBar 
            title={'Panel de Gestión'}
            useBackground={false}
            SecondIcon='add-circle'
            />
            <CustomSearch 
               placeholder={'Buscar sitio...'}
            />

            <View>
                <HorizontalCardPlace />
            </View>
           
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    placeContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#236A34',
    },
    placeDetails: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
    commentsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    comment: {
        fontSize: 13,
        color: '#555',
        marginLeft: 10,
    },
    noComments: {
        fontSize: 13,
        color: '#999',
        marginLeft: 10,
    },
    placeActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default DashboardScreen;
