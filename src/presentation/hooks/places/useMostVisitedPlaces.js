import { useEffect, useState } from 'react';
import { getMostVisitedPlacesUseCase } from '../../../domain/usecases/places/getMostVisitedPlacesUseCase';

const useMostVisitedPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostVisitedPlaces = async () => {
            try {
                console.log('🔄 Iniciando carga de lugares más visitados...');
                const data = await getMostVisitedPlacesUseCase();
                console.log('✅ Lugares más visitados obtenidos:', data);
                setPlaces(data || []); // Si data es undefined o null, establece un arreglo vacío
            } catch (err) {
                console.error('❌ Error cargando lugares más visitados:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMostVisitedPlaces();
    }, []);

    return { places, loading, error };
};


export default useMostVisitedPlaces;
