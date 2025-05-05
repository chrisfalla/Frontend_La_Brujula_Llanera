export class PlaceByCategoryMockApi {
  async fetchPlaces() {
    console.log("🔥 Usando MOCK de lugares por categoria");

    await new Promise((r) => setTimeout(r, 500));

    return [
      {
        "idPlace": 6,
        "name": "Hobos",
        "description": "Aqui trotamos y vemos peladas correr",
        "phoneNumber": "3296789564",
        "idCategorie": 1,
        "createdAt": "2025-04-21T22:00:39.000Z",
        "updatedAt": "2025-04-21T22:00:41.000Z",
        "average": 5,
        "image": "https://images.unsplash.com/photo-1544919982-b61982e3c3d8"
      },
      {
        "idPlace": 7,
        "name": "Yopalito",
        "description": "Aqui invitamos a peladitas pa parchar un rato",
        "phoneNumber": "3138867669",
        "idCategorie": 1,
        "createdAt": "2025-04-22T02:27:46.000Z",
        "updatedAt": "2025-04-22T02:27:49.000Z",
        "average": 4.5,
        "image": "https://images.unsplash.com/photo-1586500036706-41963de24d8b"
      }
    ];
  }
}