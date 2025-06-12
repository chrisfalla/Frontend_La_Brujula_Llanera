import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground,Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, TextStyles } from '../../styles/styles';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';


const tabs = ['Sobre nosotros', 'Contacto', 'Comentar'];

const DetailInfo = ({ description, phoneNumber, mail, navigation, placeId, initialTab = 'Sobre nosotros' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useFocusEffect(
        React.useCallback(() => {
            setActiveTab(initialTab);
        }, [initialTab])
    );

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        if (tab === 'Comentar' && navigation && placeId) {
            navigation.navigate('PlaceReviews', { placeId });
        }
    };
    const showOptions = (type, value) => {
        const options = [];

        if (type === 'whatsapp') {
            options.push({
                text: 'Abrir WhatsApp',
                onPress: () => Linking.openURL(`https://wa.me/57${value}`),
            });
        } else if (type === 'phone') {
            options.push({
                text: 'Llamar',
                onPress: () => Linking.openURL(`tel:+57${value}`),
            });
        } else if (type === 'email') {
            options.push({
                text: 'Enviar correo',
                onPress: () => Linking.openURL(`mailto:${value}`),
            });
        }

        options.push({
            text: 'Copiar',
            onPress: () => {
                Clipboard.setStringAsync(type === 'email' ? value : `+57${value}`);
                Alert.alert('Copiado', `${type === 'email' ? 'Correo' : 'Número'} copiado al portapapeles`);
            },
        });

        options.push({ text: 'Cancelar', style: 'cancel' });

        Alert.alert(
            type === 'email' ? 'Correo' : 'Número',
            type === 'email' ? value : `+57 ${value}`,
            options,
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {tabs.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => handleTabPress(tab)}
                            style={styles.tab}
                        >
                            <Text style={[
                                styles.tabText,
                                isActive && styles.activeTabText
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {activeTab === 'Contacto' ? (
                <View style={styles.contactContainer}>
                    <TouchableOpacity
                        style={styles.contactRow}
                        onPress={() => showOptions('whatsapp', phoneNumber)}
                    >
                        <Ionicons name="logo-whatsapp" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactRow}
                        onPress={() => showOptions('phone', phoneNumber)}
                    >
                        <Ionicons name="call" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactRow}
                        onPress={() => showOptions('email', mail)}
                    >
                        <Ionicons name="mail" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>{mail}</Text>
                    </TouchableOpacity>
                </View>
            ) : activeTab === 'Sobre nosotros' ? (
                <>
                    <TouchableOpacity
                        style={styles.mapContainer}
                        onPress={() => {
                            if (navigation && placeId) {
                                navigation.navigate('Explora', { idPlace: placeId });
                            }
                        }}
                    >
                        <ImageBackground
                            source={require('../../../shared/assets/MapsYopal.png')}
                            style={styles.mapImage}
                            imageStyle={styles.mapImageStyle}
                        >
                            <View style={styles.mapOverlay}>
                                <Ionicons name="location-sharp" size={36} color="#fff" />
                                <Text style={styles.mapText}>Ver ubicación</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.descriptionContainer}>
                        <Text style={TextStyles.PoppinsRegular13}>
                            {description || 'Descripción no disponible'}
                        </Text>
                    </View>
                </>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
        paddingTop: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 10,
    },
    tab: {
        marginRight: 20,
        spacwBetween: 10,
        paddingVertical: 8,
    },
    tabText: {
        ...TextStyles.PoppinsRegular13,
        color: Colors.DarkGray,
    },
    activeTabText: {
        ...TextStyles.PoppinsBold15,
        color: Colors.ColorPrimary,
    },
    mapContainer: {
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
    },
    mapImage: {
        flex: 1,
    },
    mapImageStyle: {
        borderRadius: 10,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,
        marginTop: 5,
    },
    descriptionContainer: {
        paddingHorizontal: 5,
    },
    contactContainer: {
        marginTop: 10,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 10,
    },
    contactText: {
        ...TextStyles.PoppinsRegular15,
        color: Colors.Black,
    },
});

export default DetailInfo;