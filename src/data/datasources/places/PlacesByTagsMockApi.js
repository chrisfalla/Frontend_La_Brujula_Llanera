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
                "image": "https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/3.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby8zLndlYnAiLCJpYXQiOjE3NDU4MjU4ODMsImV4cCI6MTc0ODQxNzg4M30.rWB1LeXO061Pd-1vb6abQFHC53cvV69w0TjDt_Ydzwk",
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
                "image": "https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/7.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby83LndlYnAiLCJpYXQiOjE3NDU4MjU4MTEsImV4cCI6MTc0ODQxNzgxMX0.3G8C9lnfKA-9nSwlbWu_X68A3v5ReJL4TY1EeJ_9KQE",
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