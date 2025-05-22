import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';
import Rating from '../../components/Rating/Rating';
import CustomInputText from '../../components/CustomInput/CustomInputText';


const PlaceReviews = ({ navigation }) => {
const [isAddingReview, setIsAddingReview] = useState(false);
const [newComment, setNewComment] = useState('');
const [rating, setRating] = useState(1);

const reviews = [
    {id: 1,
    username: 'Juan Pérez',
    comment: 'Un lugar espectacular para disfrutar en familia.',
    date: '12/05/2025',},

    {id: 2,
    username: 'Laura Gómez',
    comment: 'Me encantó la vista y la atención del personal.',
    date: '10/05/2025',},
    
    {id: 3,
    username: 'Carlos Ruiz',
    comment: 'Volvería sin pensarlo. ¡Recomendado!',
    date: '08/05/2025',},
];

const handleAddReview = () => {
    setIsAddingReview(true); // Mostrar el input y botón
};

const handleSubmitReview = () => {
    console.log('Comentario enviado:', newComment);
    // Aquí podrías agregar la lógica para enviar el comentario
    setNewComment('');
   setIsAddingReview(false); // Vuelve a mostrar la lista
};

return (
<View style={styles.container}>
    <NavigationTopBar
        primaryIcon="chevron-back"
        onBackPress={() => navigation.goBack()}
        title="Magdalena - Comentarios"
        removeBackground={true}
    />
<View style={styles.ratingcontainer}>
    <View style={styles.ratingcard}>
        <Text style={styles.text}>Calificación General</Text>
        <Text style={styles.score}>4.3</Text>
    </View>
    <View style= {styles.rating}>
        <Rating average={4.3} />
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
    <View style= {styles.ratingsecondary}> 
        <Rating average={rating} onChange={setRating} />
    </View>

    <CustomButton
        titletext="Guardar review"
        onPress={handleSubmitReview}
        type="Secondary"
        size="Small"
    />
</View>
    ) : (
    <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
    <ReviewCard
        username={item.username}
        comment={item.comment}
        date={item.date}
    />
    )}
    />
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
    marginTop: 15,
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
    marginVertical: 20,
},

});

export default PlaceReviews;
