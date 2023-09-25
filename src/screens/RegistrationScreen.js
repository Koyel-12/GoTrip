import React, { useState } from "react";
import firebaseApp from "../firebase/firebase";
import {getAuth,createUserWithEmailAndPassword} from '@react-native-firebase/auth';
import { ImageBackground, ScrollView, Text, TextInput, View, Alert, TouchableOpacity,StyleSheet } from "react-native";

function RegistrationScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const auth = getAuth(firebaseApp);
  
    const handleRegistered = async () => {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // User is registered successfully
          navigation.navigate('Login'); // Navigate to the Login screen
          Alert.alert('Registered Successfully, you have created a new account!');
        } catch (error) {
          // Handle the error
          Alert.alert('Registration Failed', error.message);
        }
      } else {
        Alert.alert('Password and confirm password do not match.');
      }
    };

  return (
    <ImageBackground style={styles.imageBackground} source={require('../assets/travel_planbackground.jpg')}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Register Page</Text>
          <Text style={styles.subtitle}>As a new User create a new account</Text>
          <TextInput
            placeholder="Name"
            value={name}
            style={styles.inputName}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.inputEmail}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.inputPassword}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            style={styles.inputConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleRegistered}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttontext}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.alreadyLoginText}>Already have an account | Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputName: {
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
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
  inputConfirmPassword:{
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginBottom:12
  },
  buttonContainer: {
    backgroundColor: 'limegreen',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttontext: {
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 16,
  },
  topContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
  subtitle: {
    color: 'white',
    fontSize: 23,
    paddingTop: 3,
  },
  alreadyLoginText: {
    color: 'white',
    fontSize: 16,
    paddingTop: 3,
    marginTop:12
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default RegistrationScreen;