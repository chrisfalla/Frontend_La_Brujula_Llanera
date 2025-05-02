import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


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
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginVertical: 8,
        elevation: 8,
        shadowColor: 'gray',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        marginHorizontal: 5,
    },
      avatarimg:{
        backgroundColor: 'gray',
        width: 30,
        height: 30,
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
        
       
    },
    username:{
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft:10,
    },
    comment:{
        fontSize:14,
        marginLeft: 45,
        marginRight:15,        
        textAlign: 'left',
    },
    footer:{
        marginLeft: 40,
        marginTop:25,      
        textAlign: 'left'
    },
    date:{
        fontSize: 14,
        color: 'gray',
    }
});
export default ReviewCard;