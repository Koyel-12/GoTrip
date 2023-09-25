import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>About the App</Text>
            <Text style={styles.content}>This app is very securely stored data in which unwanted user cannot stole the information</Text>
            <Text style={styles.content}>This app can be used in a friendly environment</Text>
            <Text style={styles.content}>Add as many trips and services as per the unlimited journey for ongoing places</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'powderblue'
    },
    title:{
        color:'brown',
        fontSize:60,
        fontWeight:'bold',
        textAlign:'center'
    },
    content:{
        color:'red',
        marginTop:20,
        fontSize:33,
        textAlign:'center'
    }
})

export default AboutScreen;