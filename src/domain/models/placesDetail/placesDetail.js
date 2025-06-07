export default class PlaceDetailModel {
  constructor({
    idPlace,           // ← Usa los nombres exactos de la API
    placeName,         // ← No cambiar estos nombres
    categoryName,
    placeDescription,
    placeRatingStars,
    images = [],
    socialMedia = [],
  }) {
    // Mapeo correcto de propiedades
    this.id = idPlace;
    this.name = placeName;         // Mantén placeName
    this.category = categoryName;  // Mantén categoryName
    this.description = placeDescription;
    this.rating = parseFloat(placeRatingStars) || 0;
    this.images = images;
    this.socialMedia = socialMedia;

    console.log("✅ Modelo creado correctamente:", {
      id: this.id,
      name: this.name,
      category: this.category,
      rating: this.rating
    });
  }
}