import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const MostVisitedPlaces = ({ onPlacePress }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [places, setPlaces] = useState([]);
    const flatListRef = useRef(null);
    const autoScrollTimer = useRef(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const repository = providePlacesMoreVisitedRepository();
                const useCase = new GetPlacesMoreVisitedUseCase(repository);
                const result = await useCase.execute();
                setPlaces([...result, result[0]]);
            } catch (error) {
                console.error('Error cargando lugares más visitados:', error);
            }
        };
        fetchPlaces();
    }, []);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll();
        autoScrollTimer.current = setInterval(() => {
            if (places.length > 0 && flatListRef.current) {
                const nextIndex = currentIndex + 1;

                if (nextIndex >= places.length - 1) {
                    flatListRef.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                        viewPosition: 0.5,
                        viewOffset: 0,
                    });

                    setTimeout(() => {
                        flatListRef.current.scrollToIndex({
                            index: 0,
                            animated: false
                        });
                        setCurrentIndex(0);
                    }, 500);
                } else {
                    flatListRef.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                        viewPosition: 0.5,
                        viewOffset: 0,
                    });
                    setCurrentIndex(nextIndex);
                }
            }
        }, 4000);
    }, [currentIndex, places.length]);

    const stopAutoScroll = () => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [startAutoScroll]);

    const handleManualScroll = useCallback(() => {
        stopAutoScroll();
        startAutoScroll();
    }, [startAutoScroll]);

    const renderItem = useCallback(({ item }) => (
        <View style={styles.card}>
            <Image
                source={{
                    uri: item.imageUrl || 'https://via.placeholder.com/400x200'
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{item.name}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPlacePress(item)}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
        </View>
    ), [onPlacePress]);

    const renderPagination = () => (
        <View style={styles.paginationContainer}>
            {places.slice(0, -1).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.paginationDot,
                        currentIndex % (places.length - 1) === index && styles.paginationDotActive
                    ]}
                />
            ))}
        </View>
    );

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50
    };

    if (places.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Los <Text style={styles.titleHighlight}>mas visitados</Text> en nuestra App:
            </Text>
            <FlatList
                ref={flatListRef}
                data={places}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.idPlace}-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get('window').width}
                decelerationRate={0.85}
                snapToAlignment="center"
                bounces={false}
                bouncesZoom={false}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
                contentContainerStyle={styles.listContainer}
                onScrollBeginDrag={handleManualScroll}
                onMomentumScrollEnd={(event) => {
                    const contentOffset = event.nativeEvent.contentOffset.x;
                    const viewSize = Dimensions.get('window').width;
                    const currentIndex = Math.round(contentOffset / viewSize);

                    if (currentIndex === places.length - 1) {
                        setTimeout(() => {
                            flatListRef.current.scrollToIndex({
                                index: 0,
                                animated: false,
                                viewPosition: 0.5,
                                viewOffset: 0,
                            });
                            setCurrentIndex(0);
                        }, 100);
                    } else {
                        setCurrentIndex(currentIndex);
                    }
                    startAutoScroll();
                }}
                scrollEventThrottle={32}
                getItemLayout={(data, index) => ({
                    length: Dimensions.get('window').width,
                    offset: Dimensions.get('window').width * index,
                    index,
                })}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        if (flatListRef.current) {
                            flatListRef.current.scrollToIndex({
                                index: 0,
                                animated: true
                            });
                        }
                    });
                }}
                initialScrollIndex={0}
                maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                }}
            />
            {renderPagination()}
        </View>
    );
};

MostVisitedPlaces.propTypes = {
    onPlacePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.040)',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    titleHighlight: {
        color: '#236A34',
        fontWeight: '600',
    },
    card: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.5,
        marginHorizontal: Dimensions.get('window').width * 0.05,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height: 8,
        },
        shadowOpacity: 0.45,
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        margin: 'auto'
    },
    labelContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        backgroundColor: '#236A34',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 16,
        paddingVertical: 6,
        maxWidth: '80%',
        height: 40,
        justifyContent: 'center',
    },
    labelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 8,
        paddingVertical: 0,
        width: '30%',
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 2,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#236A34',
        width: 9,
        height: 9,
    },
    listContainer: {
        alignItems: 'center',
        paddingHorizontal: 0,
    },
});

export default MostVisitedPlaces;