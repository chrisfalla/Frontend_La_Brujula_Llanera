import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { GlobalStyles, TextStyles,Colors } from '../../styles/styles';


const ReviewCard = ({ username, comment, date }) => {
    return (
        <View style={styles.card} >
            <View style={styles.header}>
                <View style={styles.avatar}> 
                </View>
                <Image style={styles.avatarimg}
                    source={require('../../../shared/assets/AvatarHeader.png')}
                />
               
                <View>
                    <Text style={styles.username} >{username} </Text>
                </View>            
            </View>
        <Text  style={styles.comment}>{comment} </Text>
        <View style={styles.footer} >
            <Text style={styles.date} > {date} </Text>
        </View>
        </View>
    );
};
const styles = StyleSheet.create({
    card:{
        ...GlobalStyles.CardBaseStyle,
        padding: 5,
        marginVertical: 8,
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
    username:{
        ...TextStyles.PoppinsSemiBold15,
        marginLeft:10,
    },
    comment:{
        ...TextStyles.PoppinsRegular15,
        marginLeft: 45,
        marginRight:15,        

    },
    footer:{
        marginLeft: 40,
        marginTop:25,      
        textAlign: 'left'
    },
    date:{
        ...TextStyles.PoppinsRegular15,
        color: Colors.DarkGray,
    }
});
export default ReviewCard;