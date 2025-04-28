import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../../components/Header';
import { GetTagsUseCase } from '../../../domain/usecases/tags/GetTagsUseCase';
import { provideTagsRepository } from '../../../data/repositories/Tags/ProvideTagsRepository';
import CustomCheap from '../../components/CustomCheap/CustomCheap';

const HomeScreen = () => {
  const [tags, setTags] = useState([]); // lista de tags
  const [selectedTagId, setSelectedTagId] = useState(null); // cuál tag está seleccionado

  useEffect(() => {
    const loadTags = async () => {
      console.log("🚀 Ejecutando GetTagsUseCase...");
      const repository = provideTagsRepository();
      const useCase = new GetTagsUseCase(repository);
      const result = await useCase.execute();
      console.log("✅ Tags cargados:", result);

      // Limitar a solo los primeros 5 tags
      setTags(result.slice(0-5));
      
      // Selecciona por defecto el primer tag
      if (result.length > 0) {
        setSelectedTagId(result[0].idTag);
      }
    };
    loadTags();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textScreens}>
        <Text>
          <Text style={styles.colorPrimary}>Recomendados</Text>
          <Text style={styles.normalText}> de la Semana</Text>
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.body}>
          <Text style={styles.title}>Bienvenido a mi App</Text>
          <Image source={require('../../../shared/assets/AvatarHeader.png')} />
          <Text style={styles.subtitle}>Este es el logo de la app</Text>

          {/* se muestran los tags */}
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <CustomCheap
                key={tag.idTag}
                label={tag.name}
                selected={selectedTagId === tag.idTag}
                onPress={() => setSelectedTagId(tag.idTag)}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  textScreens: {
    padding: 10,
    alignItems: 'center',
  },
  colorPrimary: {
    fontSize: 22,
    fontWeight: '900',
    color: '#236A34',
  },
  normalText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los elementos se ajusten en varias filas
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
