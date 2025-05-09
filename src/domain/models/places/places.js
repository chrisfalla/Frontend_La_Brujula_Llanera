export class Place {
    constructor({ idPlace, placeName, visitCount, imageUrl }) {
        this.id = idPlace; // Identificador único del lugar
        this.name = placeName; // Nombre del lugar
        this.visitCount = visitCount; // Contador de visitas
        this.imageUrl = imageUrl; // URL de la imagen del lugar
    }
}
