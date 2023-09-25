import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Card } from "react-native-paper";
import SQLite from 'react-native-sqlite-storage';
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

const firebaseFirestore = firebase.firestore();

function HomeScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const db = SQLite.openDatabase(
    { name: 'trip_database.db', location: 'default' },
    () => {
      console.log('Database opened successfully');
    },
    (error) => {
      console.error('Error opening database', error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, tripName TEXT, startDate TEXT, endDate TEXT, task TEXT, sourceDestination TEXT)',
              [],
              () => {
                console.log('Table "trips" created or already exists');
                resolve();
              },
              (error) => {
                console.error('Error creating table "trips":', error);
                reject(error);
              }
            );
          });
        });

        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM trips',
            [],
            (_, { rows }) => {
              const sqliteData = rows.raw();
              setTrips(sqliteData);
            },
            (error) => {
              console.error('Error fetching data from SQLite:', error);
            }
          );
        });

        const fetchTrips = async () => {
          try {
            const querySnapshot = await firebaseFirestore.collection("trips").get();
            const tripData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTrips(tripData);
          } catch (error) {
            console.error("Error fetching trips:", error);
          }
        };

        // Call the fetchTrips function when the component mounts
        fetchTrips();
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditTrip = (tripId) => {
    navigation.navigate('EditTrip', { tripId });
  };

  const handleLogout=()=>{
    navigation.navigate('Login');
  }

  const handleDeleteTrip = (tripId) => {
    firestore()
      .collection('trips')
      .doc(tripId)
      .delete()
      .then(() => {
        console.log('Trip Deleted from Firebase Firestore');
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      })
      .catch((error) => {
        console.error('Error deleting trip from Firebase Firestore:', error);
      });
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM trips WHERE id=?',
        [tripId],
        () => {
          console.log('Trips deleted from SQLite');
        },
        (error) => {
          console.error('Error deleting trip from SQLite:', error);
        }
      );
    });
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../assets/travel_planbackground.jpg")}
    >
      <View style={styles.container}>
      <Text style={styles.tripText}>Trip</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={styles.tripName}>Trip Name: {item.tripName}</Text>
              <Text style={styles.startDate}>
                Start Date: {item.startDate ? new Date(item.startDate).toISOString().split("T")[0] : "N/A"}
              </Text>
              <Text style={styles.endDate}>
                End Date: {item.endDate ? new Date(item.endDate).toISOString().split("T")[0] : "N/A"}
              </Text>
              <Text style={styles.tasks}>Tasks</Text>
              <Text style={styles.taskName}>Task Name: {item.task}</Text>
              <Text style={styles.taskDate}>
                Task Date: {item.taskDate ? new Date(item.taskDate).toISOString().split("T")[0] : "N/A"}
              </Text>
              <Text style={styles.taskTime}>Task Time: {item.taskTime}</Text>
              <Text style={styles.taskDescription}>
                Task Description: {item.taskDescription}
              </Text>
              <Text style={styles.sourceDestination}>
                Source Destination: {item.sourceDestination}
              </Text>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => handleEditTrip(item.id)}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => handleDeleteTrip(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </Card>
          )}
        />
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate("AddTrip")}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttontext}>+ Add Trip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Your styles here
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "green",
    padding: 15,
    marginBottom:20
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
  tripName: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  startDate: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  endDate: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  tasks: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  taskName: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  taskDate: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  taskTime: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  taskDescription: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  sourceDestination: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  buttonEdit: {
    backgroundColor: "yellow",
    padding: 4, // Decreased padding to make it smaller
    borderRadius: 4, // Decreased border radius to make it less rounded
    marginTop: 4, // Adjusted margin for spacing
    alignItems: "center",
  },
  buttonDelete: {
    backgroundColor: "yellow",
    padding: 4, // Decreased padding to make it smaller
    borderRadius: 4, // Decreased border radius to make it less rounded
    marginTop: 4, // Adjusted margin for spacing
    alignItems: "center",
  },
  
  editText: {
    color: "blue",
    fontSize: 40,
    fontWeight: "bold",
  },
  deleteText: {
    color: "blue",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "darkred",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 20, // Add margin to push the button to the bottom
  },
  buttontext: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1, // This allows the ScrollView to grow and push the button to the bottom
    padding: 16,
  },
  topContainer: {
    flex: 1, // Make the topContainer take up all available vertical space
    justifyContent: "flex-end", // Push its content to the bottom
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
  subtitle: {
    color: "white",
    fontSize: 23,
    paddingTop: 3,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  createRegistrationText: {
    color: "white",
    fontSize: 16,
    paddingTop: 3,
    marginBottom: 12,
  },
  forgetPasswordText: {
    color: "white",
    fontSize: 16,
    paddingTop: 3,
    marginBottom: 12,
  },
  inputEmail: {
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  inputPassword: {
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20, // Adjust the top padding as needed
  },
  tripText: {
    color: "white",
    fontSize: 33,
    fontWeight: "600",
  },
  logoutButton: {
    position: "absolute",
    top: 20, // Adjust the top position as needed
    right: 20, // Adjust the right position as needed
    backgroundColor: "darkred", // Customize the button style
    padding: 10,
    borderRadius: 8,
    zIndex: 1, // Make sure the button appears above other elements
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
