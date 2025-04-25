export class PlaceMoreVisitedMockApi {
    async fetchPlaces() {
        console.log("🔥 Usando MOCK de lugares mas visitados");

        await new Promise((r) => setTimeout(r, 500));

        return [
            {
                "name": "Catedral San José",
                "idPlace": 2,
                "visitCount": 3,
                "imageUrl": null,
                "imageCategoryId": null
            },
            {
                "name": "Centro Comercial Unicentro Yopal",
                "idPlace": 3,
                "visitCount": 2,
                "imageUrl": "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2",
                "imageCategoryId": 1
            },
            {
                "name": "Restaurante El Llanero Real",
                "idPlace": 4,
                "visitCount": 2,
                "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
                "imageCategoryId": 1
            },
            {
                "name": "Hotel Estelar Yopal",
                "idPlace": 5,
                "visitCount": 2,
                "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                "imageCategoryId": 1
            }
        ];
    }
}