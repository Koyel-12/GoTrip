import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import AddTripScreen from '../screens/AddTripScreen';
import EditTripScreen from '../screens/EditTripScreen';

const Stack=createStackNavigator();
const Tabs=createMaterialTopTabNavigator();
const NativeStack=createNativeStackNavigator();

function HomeStack(){
  return(
    <NativeStack.Navigator initialRouteName={HomeScreen}>
      <NativeStack.Screen component={HomeScreen} name='Home' options= {{headerStyle: {
                backgroundColor: 'darkred',
                shadowOpacity: 0,
                alignItems: 'center',
                justifyContent:'center'
                
            },
            headerTitleAlign:'center',
            headerTitle: 'Find Best Trip Planning',
            headerTitleStyle: {
                color: 'white',
                fontWeight: '800',
                justifyContent: 'center',
                alignItems:'center'
            },
            }}/>
      <NativeStack.Screen component={AddTripScreen} name='AddTrip' options={{headerShown:false}}/>
      <NativeStack.Screen component={EditTripScreen} name='EditTrip' options={{headerShown:false}}/>
    </NativeStack.Navigator>
  )
}

function Main(){
  return(
    <Tabs.Navigator initialRouteName={HomeScreen}>
      <Tabs.Screen component={HomeStack} name='Home'/>
      <Tabs.Screen component={AboutScreen} name='About'/>
      <Tabs.Screen component={ContactScreen} name='Contact'/>
    </Tabs.Navigator>
  )
}

function Router(){
    return(
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen component={LoginScreen} name='Login' options={{headerShown:false}}/>
            <Stack.Screen component={RegistrationScreen} name='Register' options={{headerShown:false}}/>
            <Stack.Screen component={Main} name='Main' options={{headerShown:false}}/>
            <Stack.Screen component={ForgotPasswordScreen} name='ForgotPassword' options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;