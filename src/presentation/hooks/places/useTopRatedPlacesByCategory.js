import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedPlacesByCategory } from '../../../shared/store/topRatedPlacesSlice/topRatedPlacesSlice';

/**
 * Hook para acceder y gestionar los lugares mejor calificados por categoría
 * desde el estado global de Redux.
 * 
 * Este hook es solo una abstracción de acceso al estado global,
 * todos los datos se mantienen en el store central de Redux
 * y pueden ser accedidos desde cualquier componente.
 */
const useTopRatedPlacesByCategory = (idCategory) => {
  const dispatch = useDispatch();
  // Accedemos directamente al estado global del store de Redux
  const { items, status, error } = useSelector(state => state.topRatedPlaces);

  useEffect(() => {
    // Solo disparamos la acción si hay una categoría seleccionada
    if (idCategory) {
      dispatch(fetchTopRatedPlacesByCategory(idCategory));
    }
  }, [idCategory, dispatch]);

  return { places: items, loading: status === 'loading', error };
};

export default useTopRatedPlacesByCategory;
