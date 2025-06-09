import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { GlobalStyles, TextStyles,Colors } from '../../styles/styles';
import Rating from '../Rating/Rating';


const ReviewCard = ({ username, comment, date, rating = 0, starSize = 16 }) => {
    return (
        <View style={styles.card} >
            <View style={styles.header}>
                <View style={styles.avatar}> 
                </View>
                <Image style={styles.avatarimg}
                    source={require('../../../shared/assets/AvatarHeader.png')}
                />
               
                <View style={styles.userInfo}>
                    <Text style={styles.username} >{username} </Text>
                </View>            
            </View>
        <Text  style={styles.comment}>{comment} </Text>
        <View style={styles.footer} >
            <Text style={styles.date} > {date} </Text>
            <View style={styles.ratingContainer}>
                <Rating 
                    average={rating} 
                    useBackground={false} 
                    size={starSize} 
                />
            </View>
        </View>
        </View>
    );
};
const styles = StyleSheet.create({
    card:{
        ...GlobalStyles.CardBaseStyle,
        padding: 5,
        marginVertical: 8,
        width: '98%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    avatarimg:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        
       
    },
    userInfo: {
        marginLeft: 10,
        flex: 1,
    },
    username:{
        ...TextStyles.PoppinsSemiBold15,
        marginBottom: 2,
    },
    ratingContainer: {
        alignSelf: 'flex-start',
    },
    comment:{
        ...TextStyles.PoppinsRegular15,
        marginLeft: 45,
        marginRight:15,        

    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 15,
        marginTop: 25,
    },
    date:{
        ...TextStyles.PoppinsRegular15,
        color: Colors.DarkGray,
    }
});
export default ReviewCard;