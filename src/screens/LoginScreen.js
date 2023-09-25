import React,{useState} from "react";
import firebaseApp from "../firebase/firebase";
import {getAuth,signInWithEmailAndPassword} from '@react-native-firebase/auth';
import { ImageBackground, ScrollView, Text, TextInput, View,Alert, TouchableOpacity,StyleSheet } from "react-native";

function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(firebaseApp);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User is logged in successfully
      navigation.navigate('Main'); // Navigate to the Home screen or any other screen you want
      Alert.alert('Login Successful');
    } catch (error) {
      // Handle the error
      Alert.alert('Login Failed', error.message);
    }
  };
    return(
        <ImageBackground style={styles.imageBackground} source={require('../assets/travel_planbackground.jpg')}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Login Page</Text>
                    <Text style={styles.subtitle}>After the successfully Registered, Now do Login</Text>
                    <TextInput
                      placeholder="Email"
                      value={email}
                      style={styles.inputEmail}
                      onChangeText={(text)=>setEmail(text)} 
                    />
                    <TextInput
                    placeholder="Password"
                    value={password}
                    style={styles.inputPassword}
                    onChangeText={(text)=>setPassword(text)}
                    secureTextEntry
                    />
                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttontext}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                        <Text style={styles.createRegistrationText}>Dont have an account | Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgetPasswordText}>Already Forget your password | click on ForgotPassword</Text>
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
     createRegistrationText: {
      color: 'white',
      fontSize: 16,
      paddingTop: 3,
      marginBottom:12
    },
    forgetPasswordText: {
      color: 'white',
      fontSize: 16,
      paddingTop: 3,
      marginBottom:12
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
    inputPassword:{
      width: 300,
      height: 60,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      padding: 10,
      marginBottom:12
    },
})
export default LoginScreen;