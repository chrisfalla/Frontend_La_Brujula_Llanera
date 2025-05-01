import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavigationTopBar = ({ primaryIcon = "chevron-back", SecondIcon = "heart-outline", onBackPress, useBackground = true, useHeart = true, title }) => {
    const [isHeartActive, setIsHeartActive] = useState(false);

    const handleHeartPress = () => {
        setIsHeartActive(!isHeartActive);
    };

    const heartIconName = isHeartActive ? "heart" : SecondIcon;

    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <TouchableOpacity 
                    style={[
                        styles.iconContainer,
                        styles.iconContainerSize
                    ]} 
                    onPress={onBackPress}
                >
                    <View style={styles.iconWrapper}>
                        <Ionicons 
                            style={styles.icon}
                            name={primaryIcon}
                            size={22}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={[styles.title, !title && styles.titleHidden]}>
                    {title ? title : null}
                </Text>

                <TouchableOpacity 
                    style={[
                        styles.iconContainer,
                        styles.iconContainerSize,
                        !useHeart && styles.hiddenIcon
                    ]}
                    onPress={useHeart ? handleHeartPress : null}
                    disabled={!useHeart}
                >
                    <View style={styles.iconWrapper}>
                        <Ionicons
                            style={[styles.icon, isHeartActive && styles.heartActive]}
                            name={heartIconName}
                            size={22}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 40
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',    
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#d5dbda',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerSize: {
        width: 40,
        height: 40,
    },
    iconWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#236A34',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        padding: 0,
        margin: 0,
    },
    heartActive: {
        color: '#236A34',
    },
    hiddenIcon: {
        opacity: 0,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#236A34',
    },
    titleHidden: {
        opacity: 0,
    },
});

export default NavigationTopBar;







