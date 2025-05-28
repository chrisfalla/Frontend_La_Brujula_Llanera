/**
 * Modelo simple para favoritos - usando objetos planos en lugar de clases
 */
export const createFavorite = (props = {}) => {
  // Sanear las propiedades para asegurar que son serializables
  return {
    idPlace: props.idPlace || props.id || 0,
    idPlaceFk: props.idPlaceFk || props.idPlace || props.id || 0,
    name: props.name || props.placeName || '',
    rating: typeof props.rating === 'number' ? props.rating : 0,
    imageUrl: typeof props.imageUrl === 'string' ? props.imageUrl : '',
    categoryName: props.categoryName || props.category || '',
    userId: props.userId || props.idUser || props.idUserFk || 0,
    idUserFk: props.idUserFk || props.userId || props.idUser || 0
  };
};

// Mantenemos la clase para compatibilidad hacia atrás, pero garantizamos serialización
export class Favorite {
  constructor(props = {}) {
    Object.assign(this, createFavorite(props));
  }

  toJSON() {
    return createFavorite(this);
  }
}