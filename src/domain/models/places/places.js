export class Place {
    constructor({ 
      idPlace, 
      placeName, 
      visitCount, 
      imageUrl, 
      ratingStars, 
      imageCategoryName, 
      tagInfo, 
      placeAddress, 
      categoryInfo,
      latitude,
      longitude,
      name,
      address,
      image,
      rating,
      category,
      description,
      geometry,
      place_id,
      types
    }) {
      this.idPlace = idPlace;
      this.placeName = placeName || name;
      this.visitCount = visitCount;
      this.imageUrl = imageUrl || image;
      this.ratingStars = ratingStars || rating;
      this.imageCategoryName = imageCategoryName;
      this.tagInfo = tagInfo;
      this.placeAddress = placeAddress || address;
      this.categoryInfo = categoryInfo;
      
      // Nuevas propiedades para coordenadas
      this.latitude = latitude;
      this.longitude = longitude;
      this.name = name || placeName;
      this.address = address || placeAddress;
      this.image = image || imageUrl;
      this.rating = rating || ratingStars;
      this.category = category;
      this.description = description;
      
      // Propiedades adicionales de Google Places
      this.geometry = geometry;
      this.place_id = place_id || idPlace;
      this.types = types;
    }
  }

  
