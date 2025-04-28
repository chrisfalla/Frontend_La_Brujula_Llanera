export class PlaceByTagsMockApi {
    async fetchPlaces() {
        console.log("🔥 Usando MOCK de lugares por tags");

        await new Promise((r) => setTimeout(r, 500));

        return [
            {
                "idPlace": 2,
                "name": "CATEDRAL SAN JOSE",
                "description": "La catedral más importante de Yopal, ubicada en el centro de la ciudad.",
                "phoneNumber": null,
                "idCategorie": 2,
                "createdAt": "2025-04-17T15:45:15.868Z",
                "updatedAt": "2025-04-17T15:45:15.868Z",
                "average": 5,
                "image": "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
                "idTags": [
                    2,
                    1
                ]
            },
            {
                "idPlace": 6,
                "name": "HOBOS",
                "description": "Aqui trotamos y vemos peladas correr",
                "phoneNumber": "3296789564",
                "idCategorie": 1,
                "createdAt": "2025-04-21T22:00:39.000Z",
                "updatedAt": "2025-04-21T22:00:41.000Z",
                "average": 5,
                "image": "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
                "idTags": [
                    2
                ]
            },
            {
                "idPlace": 7,
                "name": "YOPALITO",
                "description": "Aqui invitamos a peladitas pa parchar un rato",
                "phoneNumber": "3138867669",
                "idCategorie": 1,
                "createdAt": "2025-04-22T02:27:46.000Z",
                "updatedAt": "2025-04-22T02:27:49.000Z",
                "average": 4.5,
                "image": "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
                "idTags": [
                    2,
                    3
                ]
            }
        ];
    }
}