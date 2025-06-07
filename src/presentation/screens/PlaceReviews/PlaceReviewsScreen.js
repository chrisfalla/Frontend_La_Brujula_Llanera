import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';
import Rating from '../../components/Rating/Rating';
import CustomInputText from '../../components/CustomInput/CustomInputText';
import { getReviewsByPlaceId, addReview } from '../../../infrastructure/api/reviews/reviewApi';
import { useSelector } from 'react-redux';

const PlaceReviews = ({ navigation, route }) => {
    const [isAddingReview, setIsAddingReview] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [generalInfo, setGeneralInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Suponiendo que el placeId llega por route.params.placeId
    const placeId = route?.params?.placeId;
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviewsByPlaceId(placeId);
                console.log('Reviews desde backend:', data); // LOG para depuración
                setReviews(data.reviews || []);
                setGeneralInfo(data.generalInfo || {});
            } catch (error) {
                console.log('Error al obtener reviews:', error); // LOG para depuración
                setReviews([]);
                setGeneralInfo({});
            } finally {
                setIsLoading(false);
            }
        };
        if (placeId) fetchReviews();
    }, [placeId, isAddingReview]);

    const handleAddReview = () => {
        setIsAddingReview(true); // Mostrar el input y botón
    };

    const handleSubmitReview = async () => {
        try {
            const userId = user?.id || user?.idUser;
            if (!userId) {
                alert('Debes iniciar sesión para dejar un comentario');
                return;
            }
            const reviewPayload = {
                comment: newComment,
                ratingValue: rating,
                userId,
                placeId,
            };
            console.log('Payload que se envía al backend:', reviewPayload);
            await addReview(reviewPayload);
            setNewComment('');
            setIsAddingReview(false);
            // Refresca la lista de reviews
            setIsLoading(true);
            const data = await getReviewsByPlaceId(placeId);
            setReviews(data.reviews || []);
            setGeneralInfo(data.generalInfo || {});
        } catch (error) {
            console.log('Error al enviar review:', error.response?.data || error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                    barStyle="dark-content" // Para iconos oscuros en fondo claro
                    backgroundColor="#ffffff" // Fondo blanco para Android
                    translucent={false} // No translúcido para evitar superposiciones
                    
                    />

            <NavigationTopBar
                primaryIcon="chevron-back"
                onBackPress={() => navigation.goBack()}
                title=" Comentarios"
                useBackground={false}
                SecondIcon={false}
            />

            <View style={styles.ratingcontainer}>
                <View style={styles.ratingcard}>
                    <Text style={styles.text}>Calificación General</Text>
                    <Text style={styles.score}>{generalInfo.generalRating ?? 'N/A'}</Text>
                </View>
                <View style={styles.rating}>
                    <Rating average={generalInfo.generalRating ?? 0} />
                </View>
            </View>

            <View style={styles.buttoncontainer}>
                <CustomButton
                    titletext="Añadir Review"
                    onPress={handleAddReview}
                    type="Primary"
                    size="Small"
                />
            </View>

            {/* Condicional: si estamos añadiendo review, mostramos el input y botón */}
            {isAddingReview ? (
                <View style={styles.reviewform}>
                    <CustomInputText
                        LabelText={'Ingresa su review'}
                        PlaceholderText={'comentario.....'}
                        HasError={false}
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <View style={styles.ratingsecondary}>
                        <Rating average={rating} onChange={setRating} useBackground={false} />
                    </View>

                    <CustomButton
                        titletext="Guardar review"
                        onPress={handleSubmitReview}
                        type="Secondary"
                        size="Small"
                    />
                </View>
            ) : (
                isLoading ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando comentarios...</Text>
                ) : (
                    <FlatList
                        data={reviews}
                        keyExtractor={(item) => (item.idReview?.toString ? item.idReview.toString() : String(item.idReview))}
                        renderItem={({ item }) => {
                            // El campo user puede ser un objeto, ajusta según la estructura real
                            const username = item.user?.name || item.user?.username || 'Usuario';
                            return (
                                <ReviewCard
                                    username={username}
                                    comment={item.comment}
                                    date={item.updatedAt?.slice(0, 10) || ''}
                                />
                            );
                        }}
                    />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.ScreenBaseStyle,
        flex: 1,
    },

    ratingcontainer: {
        marginTop: 30,
        marginHorizontal: -20,
        // permite que el wrapper sobresalga
        position: 'relative',

    },

    ratingcard: {
        paddingVertical: 30,
        alignItems: 'center',
        // sombra Android
        elevation: 3,
        borderRadius: 4,
    },

    rating: {
        position: 'absolute',
        top: 153,
        alignSelf: 'center',
    },

    text: {
        ...TextStyles.PoppinsSemiBold15,
        color: Colors.DarkGray,
        marginBottom: 10,
    },

    score: {
        fontWeight: 'bold',
        color: Colors.ColorPrimary,
        fontSize: 60,
    },

    buttoncontainer: {
        marginTop: 60,
        marginBottom: 40,
        alignItems: 'center',
    },

    reviewform: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    ratingsecondary: {
        marginVertical: 25,
    },

});

export default PlaceReviews;