export class DetailToPlaceMockApi {
    async fetchPlaces() {
        console.log("🔥 Usando MOCK de detalles de lugares");

        await new Promise((r) => setTimeout(r, 500));

        return [
            
        ]

    }
}