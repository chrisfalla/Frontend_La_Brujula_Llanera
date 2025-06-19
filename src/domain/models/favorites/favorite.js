/**
 * Modelo simple para favoritos - usando objetos planos en lugar de clases
 */
export const createFavorite = ({
  idPlace = 0,
  name = '',
  rating = 0,
  imageUrl = '',
  categoryName = '',
  userId = 0,
  idPlaceFk = 0,
  idUserFk = 0
}) => {
  // Sanear las propiedades para asegurar que son serializables
  return {
    idPlace,
    idPlaceFk: idPlaceFk || idPlace,
    name,
    rating,
    imageUrl,
    categoryName,
    userId,
    idUserFk: idUserFk || userId
  };
};

// Mantenemos la clase para compatibilidad hacia atrás, pero garantizamos serialización
export class Favorite {
  constructor({
    idPlace = 0,
    name = '',
    rating = 0,
    imageUrl = '',
    categoryName = '',
    userId = 0,
    idPlaceFk = 0,
    idUserFk = 0
  }) {
    this.idPlace = idPlace;
    this.idPlaceFk = idPlaceFk || idPlace;
    this.name = name;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.categoryName = categoryName;
    this.userId = userId;
    this.idUserFk = idUserFk || userId;
  }
}