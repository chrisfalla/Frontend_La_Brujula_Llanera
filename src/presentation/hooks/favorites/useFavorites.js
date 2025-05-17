  import { useState, useEffect } from "react";
  import { getDefaultTagsUseCase } from "../../../domain/usecases/tags/getDefaultTagsUseCase";

  export  const useFavorites = () => {    

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedTags = await getDefaultTagsUseCase();

                if (Array.isArray(fetchedTags) && fetchedTags.length > 0) {
                    setTags(fetchedTags);
                } else {
                    setTags([]);
                }

                setError(null);
            } catch (err) {
                setTags([]);
                setError(err?.message || "Error al cargar las etiquetas");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { tags, loading, error };  
  }