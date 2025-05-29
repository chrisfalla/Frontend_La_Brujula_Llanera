export class Place {
    constructor({ idPlace, placeName, visitCount, imageUrl, ratingStars, imageCategoryName, tagInfo, placeAddress, categoryInfo }) {
      this.idPlace = idPlace;
      this.placeName = placeName;
      this.visitCount = visitCount;
      this.imageUrl = imageUrl;
      this.ratingStars = ratingStars;
      this.imageCategoryName = imageCategoryName;
      this.tagInfo = tagInfo;
      this.placeAddress = placeAddress;   // Cambiado a nombre correcto
      this.categoryInfo = categoryInfo;   // Información de categoría
    }
  }

  
