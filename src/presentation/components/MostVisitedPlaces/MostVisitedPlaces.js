import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { GetPlacesMoreVisitedUseCase } from '../../../domain/usecases/places/GetPlacesMoreVisitedUseCase';
import { providePlacesMoreVisitedRepository } from '../../../data/repositories/places/ProvidePlacesRepository';

export const MostVisitedPlaces = ({ onPlacePress }) => {
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
                // Agregar el primer elemento al final para transición suave
                setPlaces([...result, result[0]]);
            } catch (error) {
                console.error('Error cargando lugares más visitados:', error);
            }
        };
        fetchPlaces();
    }, []);

    