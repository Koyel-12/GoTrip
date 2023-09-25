import React,{useState,useEffect} from "react";
import { View,Text,Image,StyleSheet } from "react-native";
import OnboardingScreen from "./src/screens/OnboardingScreen";

function App(){
    const[setSplashVisible,isSetSplashVisible]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            isSetSplashVisible(false);
        },2000);
    },[]);
    if(setSplashVisible){
        return(
            <View style={styles.container}>
                <Image source={require('./src/assets/splash_logo.png')} style={styles.image}/>
                <Text style={styles.text}>Go Trip</Text>
            </View>
        )
    }
    else{
        return(
            <OnboardingScreen/>
        )
    }
}

const styles=StyleSheet.create({
     container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'powderblue'
     },
     image:{
        height:500,
        width:400,
        resizeMode:'center',
        alignItems:"center"
     },
     text:{
        color:'steelblue',
        textAlign:"center",
        fontSize:70,
        fontWeight:'bold'
     }
})

export default App;