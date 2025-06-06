import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, TextStyles } from '../../styles/styles';

const tabs = ['Sobre nosotros', 'Contacto', 'Reviews'];

const DetailInfo = ({ description, phoneNumber, mail }) => {
    const [activeTab, setActiveTab] = useState('Sobre nosotros');
    
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {tabs.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
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
                    <View style={styles.contactRow}>
                        <Ionicons name="logo-whatsapp" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </View>
                    <View style={styles.contactRow}>
                        <Ionicons name="call" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </View>
                    <View style={styles.contactRow}>
                        <Ionicons name="mail" size={22} color={Colors.ColorPrimary} style={styles.icon} />
                        <Text style={styles.contactText}>{mail}</Text>
                    </View>
                </View>
            ) : (
                <>
                    <TouchableOpacity style={styles.mapContainer}>
                        <ImageBackground
                            source={{ uri: 'https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/mapa.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby9tYXBhLndlYnAiLCJpYXQiOjE3NDYwODE4ODQsImV4cCI6MTc3NzYxNzg4NH0.rOGcXvni5FqpcBj2baslW85AAPv735hkOXHm-xRSjY0' }}
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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 10,
    },
    tab: {
        paddingHorizontal: 12,
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