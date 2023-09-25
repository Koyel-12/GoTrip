import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function ContactScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Contact Info</Text>
            <Text style={styles.subtitle}>If you have any app issues please contact me??</Text>
            <Text style={styles.content}>Email id:koyels229@gmail.com</Text>
            <Text style={styles.content}>Phone Number:+917000592671</Text>
            <Text style={styles.content}>WhatsApp Number:+919713687191</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:'powderblue'
    },
    title:{
        color:'brown',
        fontSize:60,
        fontWeight:'bold',
        textAlign:'center'
    },
    subtitle:{
        color:'green',
        fontSize:55,
        fontWeight:'700',
        textAlign:'center'
    },
    content:{
        color:'red',
        marginTop:20,
        fontSize:33,
        textAlign:'center'
    }
})

export default ContactScreen;