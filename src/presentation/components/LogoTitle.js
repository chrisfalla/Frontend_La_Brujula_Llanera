import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LogoTitle = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/log.png')} style={styles.logo} />
            <View style={styles.containertitle}>
                <Text style={styles.title3}>
                    LA BRÚJULA <Text style={styles.title4}>LLANERA</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop:50,
    },
    logo: {
        width: 90,
        height: 90,
        marginTop: 'auto',
        marginBottom: 0,
        resizeMode: 'contain',
    },
    containertitle: {
        margin: 10,
    },
    title3: {
        fontSize: 20,
        fontWeight: '900',
        margin: 0,
    },
    title4: {
        fontSize: 54,
        fontWeight: '900',
        margin: 0,
        color: '#236A34',
    },
});

export default LogoTitle;