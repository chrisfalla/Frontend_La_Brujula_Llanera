export class PlaceDetailMockApi {
    async fetchPlaceDetail(placeId) {
        console.log("🔥 Usando MOCK de detalle de lugar:", placeId);

        // Simular tiempo de carga
        await new Promise((r) => setTimeout(r, 500));

        // Si no hay ID, retornar vacío
        if (!placeId) {
            console.warn("⚠️ No se proporcionó ID de lugar");
            return null;
        }

        // Base de datos de detalles mock
        const placeDetails = {
            "1": {
                idPlace: 1,
                name: "Parque La Iguana",
                description: "Hermoso parque natural con senderos ecológicos y avistamiento de iguanas",
                phoneNumber: "3156789012",
                idCategorie: 2, // Naturaleza
                createdAt: "2025-04-17T15:45:15.868Z",
                updatedAt: "2025-04-17T15:45:15.868Z",
                average: 4.8,
                address: "Vía Marginal de la Selva km 5",
                coordinates: {
                    latitude: 5.3396,
                    longitude: -72.3956
                },
                mainImage: "https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/Gallery023.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby9HYWxsZXJ5MDIzLndlYnAiLCJpYXQiOjE3NDYwODAzOTEsImV4cCI6MTc3NzYxNjM5MX0.MMp6VHFc-tKqpFF2TQFcekSioUwnw0HGkCJM-96tjO4",
                secondaryImages: [
                    "https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/Gallery003.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby9HYWxsZXJ5MDAzLndlYnAiLCJpYXQiOjE3NDYwODAyNjMsImV4cCI6MTc3NzYxNjI2M30.hvir8Ek9rFyF1ay6peU0AuxBoCZoey9RcfPRovFQKao",
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                    "https://images.unsplash.com/photo-1519331379826-f10be5486c6f"
                ],
                tags: ["Naturaleza", "Familiar", "Ecológico"],
                reviews: [
                    { user: "Carlos", comment: "Excelente lugar para disfrutar en familia", rating: 5 },
                    { user: "María", comment: "Muy bonito pero falta señalización", rating: 4 }
                ],
                openingHours: "8:00 AM - 5:00 PM"
            },
            "2": {
                idPlace: 2,
                name: "Catedral San José",
                description: "La catedral más importante de Yopal, ubicada en el centro de la ciudad.",
                phoneNumber: "3157890123",
                idCategorie: 3, // Cultura
                createdAt: "2025-04-17T15:45:15.868Z",
                updatedAt: "2025-04-17T15:45:15.868Z",
                average: 4.5,
                address: "Calle 9 # 20-45, Centro",
                coordinates: {
                    latitude: 5.3372,
                    longitude: -72.4032
                },
                mainImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325",
                secondaryImages: [
                    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092",
                    "https://images.unsplash.com/photo-1505664194779-8beaceb93744"
                ],
                tags: ["Cultura", "Religioso", "Histórico"],
                reviews: [
                    { user: "Juan", comment: "Arquitectura impresionante", rating: 5 },
                    { user: "Laura", comment: "Lugar muy tranquilo y espiritual", rating: 4 }
                ],
                openingHours: "6:00 AM - 8:00 PM"
            },
            "6": {
                idPlace: 6,
                name: "Hobos",
                description: "Aqui trotamos y vemos peladas correr",
                phoneNumber: "3296789564",
                idCategorie: 1,
                createdAt: "2025-04-21T22:00:39.000Z",
                updatedAt: "2025-04-21T22:00:41.000Z",
                average: 5,
                address: "Avenida Principal #45-12",
                coordinates: {
                    latitude: 5.3412,
                    longitude: -72.3987
                },
                mainImage: "https://images.unsplash.com/photo-1544919982-b61982e3c3d8",
                secondaryImages: [
                    "https://images.unsplash.com/photo-1595429035839-c99c298ffdde",
                    "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2"
                ],
                tags: ["Deporte", "Recreación", "Juventud"],
                reviews: [
                    { user: "Pedro", comment: "El mejor lugar para salir a trotar", rating: 5 },
                    { user: "Andrea", comment: "Muy buenas instalaciones", rating: 5 }
                ],
                openingHours: "5:00 AM - 9:00 PM"
            },
            "7": {
                idPlace: 7,
                name: "Yopalito",
                description: "Aqui invitamos a peladitas pa parchar un rato",
                phoneNumber: "3138867669",
                idCategorie: 1,
                createdAt: "2025-04-22T02:27:46.000Z",
                updatedAt: "2025-04-22T02:27:49.000Z",
                average: 4.5,
                address: "Calle 15 # 23-56",
                coordinates: {
                    latitude: 5.3356,
                    longitude: -72.4001
                },
                mainImage: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
                secondaryImages: [
                    "https://images.unsplash.com/photo-1559339352-11d035aa65de",
                    "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
                ],
                tags: ["Social", "Recreación", "Juvenil"],
                reviews: [
                    { user: "Manuel", comment: "Ambiente muy agradable", rating: 5 },
                    { user: "Valentina", comment: "Buenos precios pero mucha gente", rating: 4 }
                ],
                openingHours: "4:00 PM - 2:00 AM"
            }
        };

        // Buscar el lugar por ID
        return placeDetails[placeId] || null;
    }
} 