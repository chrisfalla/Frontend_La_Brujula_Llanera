import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Logo from './logoPerfil';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/Logo.jpg')} style={styles.logo} />
            <Image source={require('../assets/LogoName.jpg')} style={styles.logoName} />
            <Logo style={styles.logoPerfil} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingTop: 45,
        backgroundColor: '#fff',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginBottom: 10,
    },
    logoName: {
        width: 100, 
        height: 50,
        marginRight: 10,
    },
    logoPerfil: {
        width: 15,
        height: 15,
        marginLeft: 10,
    },
});

export default Header;