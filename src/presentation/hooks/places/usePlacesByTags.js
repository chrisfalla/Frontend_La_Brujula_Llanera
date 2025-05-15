import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlacesByTags, clearPlacesByTags } from '../../../shared/store/placesByTagsSlice/placesByTagsSlice';

const usePlacesByTags = (tagIds) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.placesByTags);

  useEffect(() => {
    if (tagIds && tagIds.length > 0) {
      dispatch(fetchPlacesByTags(tagIds));
    } else {
      dispatch(clearPlacesByTags());
    }
  }, [dispatch, tagIds]);

  return {
    places: items,
    loading: status === 'loading',
    error: error,
  };
};

export default usePlacesByTags;
