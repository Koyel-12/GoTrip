import React,{useState} from "react";
import firebaseApp from "../firebase/firebase";
import {getAuth,sendPasswordResetEmail} from '@react-native-firebase/auth';
import { ImageBackground, ScrollView, Text, TextInput, View,Alert, TouchableOpacity,StyleSheet } from "react-native";

function ForgotPasswordScreen({navigation}){
    const [email, setEmail] = useState('');
  

  const auth = getAuth(firebaseApp);

  const handleResetPassword = async () => {
    try {
      const userCredential = await sendPasswordResetEmail(auth, email);
      // User is logged in successfully
      navigation.navigate('Login'); // Navigate to the Home screen or any other screen you want
      Alert.alert('Password Reset Email','Please Check your email for instruction to reset your password');
    } catch (error) {
      // Handle the error
      Alert.alert('Reset Password Failed', error.message);
    }
  };
    return(
        <ImageBackground style={styles.imageBackground} source={require('../assets/travel_planbackground.jpg')}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Forgot Password Page</Text>
                    <Text style={styles.subtitle}>Enter your email Id</Text>
                    <TextInput
                      placeholder="Email"
                      value={email}
                      style={styles.inputEmail}
                      onChangeText={(text)=>setEmail(text)} 
                    />
                    <TouchableOpacity onPress={handleResetPassword}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttontext}>Send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
     container:{
        flex:1,
     },
     input:{
        width:300,
        height:40,
        borderWidth:1,
        borderColor:'black',
        borderRadius:8,
        padding:10
     },
     buttonContainer:{
        backgroundColor:'limegreen',
        padding:10,
        borderRadius:8,
        marginTop:10
     },
     buttontext:{
        color:'blue',
        fontSize:40,
        fontWeight:'bold'
     },
     scrollView:{
        padding:16
     },
     topContainer:{
        marginTop:100,
        alignItems:'center'
     },
     title:{
        color:'white',
        fontWeight:'bold',
        fontSize:50,
     },
     subtitle:{
        color:'white',
        fontSize:23,
        paddingTop:3,
     },
     imageBackground:{
        flex:1,
        resizeMode:'cover'
     },
    inputEmail:{
      width: 300,
      height: 60,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      padding: 10,
      marginBottom:12
    },
})
export default ForgotPasswordScreen;