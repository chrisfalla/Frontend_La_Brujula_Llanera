export class TagsMockApi {
    async fetchTags(){
        console.log("🔥 Usando MOCK de Tags");
        await new Promise((r) => setTimeout(r,500));

        return [
          {
            "idTag": 4,
            "name": "Eventos",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 5,
            "name": "Religioso",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 6,
            "name": "Museos",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 7,
            "name": "Compras",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 8,
            "name": "Restaurante",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 9,
            "name": "Bar",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 10,
            "name": "Discoteca",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 11,
            "name": "Café",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 14,
            "name": "Piscina",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 15,
            "name": "Camping",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 17,
            "name": "Turismo",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 20,
            "name": "Supermercados",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 12,
            "name": "Gastronomía",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 13,
            "name": "Hotel",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 16,
            "name": "Alojamiento",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 18,
            "name": "Parque",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 19,
            "name": "Centro Comercial",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": false
          },
          {
            "idTag": 1,
            "name": "Naturaleza",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": true
          },
          {
            "idTag": 2,
            "name": "Cultura",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": true
          },
          {
            "idTag": 3,
            "name": "Senderismo",
            "createdAt": "2025-04-17T15:45:15.196Z",
            "updatedAt": "2025-04-17T15:45:15.196Z",
            "isDefault": true
          }
        ];
    }

}
