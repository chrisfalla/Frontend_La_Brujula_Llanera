import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { GetPlacesMoreVisitedUseCase } from "../../../domain/usecases/places/GetPlacesMoreVisitedUseCase";
import { providePlacesMoreVisitedRepository } from "../../../data/repositories/places/ProvidePlacesRepository";

export const MostVisitedPlaces = ({ onPlacePress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [places, setPlaces] = useState([]);
  const flatListRef = useRef(null);
  const autoScrollTimer = useRef(null);

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
              animated: false,
            });
            setCurrentIndex(0);
          }, 500); // Aumentado a 500ms para transición más suave
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
    }, 4000); // Aumentado a 4000ms para dar más tiempo entre transiciones
  }, [currentIndex, places.length]);

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const repository = providePlacesMoreVisitedRepository();
        const useCase = new GetPlacesMoreVisitedUseCase(repository);
        const result = await useCase.execute();
        // Agregar el primer elemento al final para transición suave
        setPlaces([...result, result[0]]);
      } catch (error) {
        console.error("Error cargando lugares más visitados:", error);
      }
    };
    fetchPlaces();
  }, []);
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <Image
          source={{
            uri: item.imageUrl || "https://via.placeholder.com/400x200",
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
    ),
    [onPlacePress]
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {places.slice(0, -1).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex % (places.length - 1) === index &&
              styles.paginationDotActive,
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
    viewAreaCoveragePercentThreshold: 50,
  };

  if (places.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Los <Text style={styles.titleHighlight}>mas visitados</Text> en nuestra
        App:
      </Text>
      <FlatList
        ref={flatListRef}
        data={places}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.idPlace}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").width}
        decelerationRate={0.85} // Ajustado para scroll más suave
        snapToAlignment="center"
        bounces={false}
        bouncesZoom={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={styles.listContainer}
        onScrollBeginDrag={handleManualScroll}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const viewSize = Dimensions.get("window").width;
          const currentIndex = Math.round(contentOffset / viewSize);

          if (currentIndex === places.length - 1) {
            // Si llegamos al último elemento (duplicado), volver al inicio sin animación
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
        scrollEventThrottle={32} // Ajustado para mejor rendimiento
        getItemLayout={(data, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                index: 0,
                animated: true,
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
  onPlacePress: PropTypes.func.isRequired,
};
