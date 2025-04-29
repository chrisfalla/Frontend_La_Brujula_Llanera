export class PlaceMoreVisitedMockApi {
    async fetchPlaces() {
        console.log("🔥 Usando MOCK de lugares mas visitados");

        await new Promise((r) => setTimeout(r, 500));

        return [
            {
                "name": "Catedral San José",
                "idPlace": 2,
                "visitCount": 3,
                "imageUrl": "https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/3.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby8zLndlYnAiLCJpYXQiOjE3NDU4MjU4ODMsImV4cCI6MTc0ODQxNzg4M30.rWB1LeXO061Pd-1vb6abQFHC53cvV69w0TjDt_Ydzwk",
                "imageCategoryId": 2
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