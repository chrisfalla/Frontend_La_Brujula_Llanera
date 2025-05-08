import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, TextStyles, GlobalStyles } from '../../styles/styles';


const tabs = ['Sobre nosotros', 'Contacto', 'Reviews'];

const  DetailInfo = ({ description, phoneNumber, mail }) => {
    const [activeTab, setActiveTab] = useState('Sobre nosotros');
    return (
        <View style={styles.container}>
            {/* Slider de palabras */}
            <View style={styles.tabContainer}>
                {tabs.map((tab, idx) => {
                    // Solo los dos primeros pueden activarse en verde
                    const isActive = (tab === activeTab) && idx < 2;
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
            {/* Contenido dinámico según tab */}
            {activeTab === 'Contacto' ? (
                <View style={styles.contactContainer}>
                    <View style={styles.contactRow}>
                        <Ionicons name="logo-whatsapp" size={22} color={Colors.ColorPrimary} style={{ marginRight: 8 }} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </View>
                    <View style={styles.contactRow}>
                        <Ionicons name="call" size={22} color={Colors.ColorPrimary} style={{ marginRight: 8 }} />
                        <Text style={styles.contactText}>+57 {phoneNumber}</Text>
                    </View>
                    <View style={styles.contactRow}>
                        <Ionicons name="mail" size={22} color={Colors.ColorPrimary} style={{ marginRight: 8 }} />
                        <Text style={styles.contactText}> {mail}</Text>
                    </View>
                </View>
            ) : (
                <>
                    {/* Contenedor del mapa */}
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
                    {/* Descripción */}
                    <View style={styles.descriptionContainer}>
                        <Text style={TextStyles.PoppinsRegular13}>{description}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0, // Elimino padding extra arriba
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Alineados a la derecha
        marginBottom: 4, // Espacio igual al del mapa
        marginTop: 20, // Espacio igual al de la galería
        marginLeft: "-3.3%",
    },
    tab: {
        paddingVertical: 0,
        paddingHorizontal: 8,
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
    tabText: {
        color: Colors.DarkGray,
       ...TextStyles.PoppinsRegular13,
        
    },
    activeTabText: {
        color: Colors.ColorPrimary,
        ...TextStyles.PoppinsBold15
    },
    mapContainer: {
        height: 150,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: '4%', // Igual que el ancho de la imagen principal (92% => 4% a cada lado)
        marginLeft: '-0.5%', // Igual que el ancho de la imagen principal (92% => 4% a cada lado)
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#fff',
        fontFamily:'Poppins-Bold',
        fontSize: 13,
    },
    descriptionContainer: {
        padding: 10,
        textAlign: 'justify',
    },
    contactContainer: {
        marginTop: 16,
        marginLeft: 4,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        ...TextStyles.PoppinsRegular15,
        color: Colors.Black,
    },
});

export default  DetailInfo;