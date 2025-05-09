import { useEffect, useState } from 'react';
import { getMostVisitedPlacesUseCase } from '../../domain/usecases/places/getMostVisitedPlacesUseCase';

const useMostVisitedPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPlaces = async () => {
            try {
                const response = await getMostVisitedPlacesUseCase();
                setPlaces(response);
            } catch (err) {
                setError(err.message || 'Error al cargar los lugares.'); // Manejo de errores
            } finally {
                setLoading(false);
            }
        };

        loadPlaces();
    }, []);

    return { places, loading, error };
};

export default useMostVisitedPlaces;
