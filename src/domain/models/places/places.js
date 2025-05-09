export class Place {
    constructor({ idPlace, placeName, visitCount, imageUrl }) {
      this.idPlace = idPlace;        // clave primária que usa tu FlatList
      this.placeName = placeName;    // nombre del lugar, tal cual lo usas en JSX
      this.visitCount = visitCount;
      this.imageUrl = imageUrl;
    }
  }
  