import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../../shared/assets/CompassLogo.png')} style={styles.compass} />
            <View style={styles.containertitle}>
                <Text style={styles.title3}>LA BRÚJULA <Text style={styles.title4}>LLANERA</Text></Text>
            </View>
            <Image source={require('../../shared/assets/AvatarHeader.png')} style={styles.avatar}/>         
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingTop: 35,
        backgroundColor: '#fff',
        width: '100%',
        
    },
    compass: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    containertitle:{
        margin:10,
    },

    title3: {
        fontSize:20,
        fontWeight: '900',
        margin: 0,
        
    },
    title4: {
        fontSize: 20,
        fontWeight: '900',
        margin: 0,
        color: '#236A34',
    },
    avatar: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});

export default Header;