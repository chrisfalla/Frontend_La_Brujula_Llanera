export class Favorite {
  constructor({ idPlace, name, rating, imageUrl, categoryName, userId }) {
    this.idPlace = idPlace;               // ID del lugar
    this.name = name;                     // Nombre del lugar
    this.rating = rating;                 // Valoración del lugar
    this.imageUrl = imageUrl;             // URL de la imagen
    this.categoryName = categoryName;     // Nombre de la categoría de la imagen
    this.userId = userId;                 // ID del usuario que marcó como favorito
  }
}