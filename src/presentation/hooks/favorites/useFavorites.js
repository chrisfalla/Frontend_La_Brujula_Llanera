  import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../../shared/store/favoritesSlice/favoritesSlice";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { favorites, status, error } = useSelector(state => state.favorites);
  const user = useSelector(state => state.auth?.user);
  const userId = user?.id || user?.idUser;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId && status === 'idle') {
      setLoading(true);
      dispatch(fetchFavorites(userId))
        .finally(() => setLoading(false));
    }
  }, [dispatch, userId, status]);

  const refetch = () => {
    if (userId) {
      setLoading(true);
      dispatch(fetchFavorites(userId))
        .finally(() => setLoading(false));
    }
  };

  return { 
    favorites, 
    loading: loading || status === 'loading', 
    error, 
    refetch 
  };
};