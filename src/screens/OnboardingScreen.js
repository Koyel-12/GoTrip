import React,{useState} from "react";
import { View,Text,Image,StyleSheet, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Router from "../routers/Router";

const slides=[
    {
        id:1,
        title:'Welcome to GoTrip App',
        description:'In this App, We can easily navigate the location from one place to another.',
        image:require('../assets/location.png')
    },
    {
        id:2,
        title:'Planning trips',
        description:'In this App,We can easily plan the trips and enjoy unlimitted services.',
        image:require('../assets/plan_track.png')
    },
    {
        id:3,
        title:'Go Near places',
        description:'Set near by places where we need to explore more and more scenarios in day to day life.',
        image:require('../assets/places_near.png')
    },
    {
        id:4,
        title:'Make Travel Plan',
        description:'Save date and time in which we are going to travel in many places and enjoy unlimitted lifetime as per your wish',
        image:require('../assets/travel_plan.png')
    }
]


function OnboardingScreen() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [showHomePage,setShowHomePage]=useState(false);
    StatusBar.setBarStyle('light-content',true);
    
    if(!showHomePage){
        return(
            <AppIntroSlider
            data={slides}
            renderItem={({item})=>{
                return(
                    <View style={styles.container}>
                        <Image style={styles.image} source={item.image}/>
                        <Text style={styles.textTitle}>{item.title}</Text>
                        <Text style={styles.textDescription}>{item.description}</Text>
                    </View>
                )
            }}
            activeDotStyle={{
                backgroundColor:'orange',
                width:30
            }}
            slideIndex={slideIndex}
            onSlideChange={(slideIndex) => setSlideIndex(slideIndex)}
            renderBottomBar={() => {
                return (
                  <View style={styles.bottomBarContainer}>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Previous</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Next</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Skip</Text>
                    </View>
                  </View>
                );
              }}
            onDone={()=>{
                setShowHomePage(true)
            }}
            />
        )
    }
    else{
        return(
            <Router/>
        )
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "powderblue",
    },
    bottomBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
    buttonContainer: {
      width: 80,
      height: 80,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    textTitle: {
      color: "steelblue",
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
    },
    textDescription: {
      color: "limegreen",
      fontSize: 19,
      paddingTop: 5,
      textAlign: "center",
    },
    image: {
      height: 500,
      width: 400,
      resizeMode: "contain",
    },
  });
  
  export default OnboardingScreen;