import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from "@react-native-firebase/firestore";

function EditTripScreen({ route, navigation }) {
  const { tripId } = route.params;

  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [taskTime, setTaskTime] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [sourceDestination, setSourceDestination] = useState("");

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isTaskDatePickerVisible, setTaskDatePickerVisible] = useState(false);
  const [isTaskTimePickerVisible, setTaskTimePickerVisible] = useState(false);

  useEffect(() => {
    // Fetch trip data based on tripId and populate the state
    const fetchTripData = async () => {
      try {
        const tripDoc = await firestore().collection("trips").doc(tripId).get();
        const tripData = tripDoc.data();
        if (tripData) {
          setTripName(tripData.tripName);
          setStartDate(new Date(tripData.startDate.toDate()));
          setEndDate(new Date(tripData.endDate.toDate()));
          setTaskName(tripData.taskName);
          setTaskDate(tripData.taskDate ? new Date(tripData.taskDate.toDate()) : null);
          setTaskTime(tripData.taskTime);
          setTaskDescription(tripData.taskDescription);
          setSourceDestination(tripData.sourceDestination);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchTripData();
  }, [tripId]);

  const updateTrip = async () => {
    try {
      if (startDate && endDate) {
        const tripData = {
          tripName,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          taskName,
          taskDate: taskDate ? taskDate.toISOString() : null,
          taskTime,
          taskDescription,
          sourceDestination,
        };

        await firestore().collection("trips").doc(tripId).update(tripData);

        navigation.navigate("Home");
      } else {
        console.error("Please select valid dates before saving.");
      }
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../assets/travel_planbackground.jpg")}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Trip</Text>
          <Text style={styles.label}>Trip Name:</Text>
          <TextInput
            value={tripName}
            onChangeText={(text) => setTripName(text)}
            style={styles.input}
            placeholder="Enter trip name"
          />

          <Text style={styles.label}>Source Destination:</Text>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus={false}
            returnKeyType="default"
            fetchDetails={true}
            onPress={(data, details = null) => {
              setSourceDestination(data.description);
              console.log(data, details);
            }}
            styles={{
              textInput: styles.input,
            }}
            query={{
              key: 'YOUR_GOOGLE_MAPS_API_KEY',
              language: 'en',
            }}
          />

          <Text style={styles.label}>Start Date:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setStartDatePickerVisible(true)}
          >
            <Text>
              {startDate
                ? new Date(startDate).toLocaleDateString()
                : "Select start date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setStartDate(date);
              setStartDatePickerVisible(false);
            }}
            onCancel={() => setStartDatePickerVisible(false)}
          />

          <Text style={styles.label}>End Date:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setEndDatePickerVisible(true)}
          >
            <Text>
              {endDate
                ? new Date(endDate).toLocaleDateString()
                : "Select end date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setEndDate(date);
              setEndDatePickerVisible(false);
            }}
            onCancel={() => setEndDatePickerVisible(false)}
          />

          <Text style={styles.label}>Task Name:</Text>
          <TextInput
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
            style={styles.input}
            placeholder="Enter task name"
          />

          <Text style={styles.label}>Task Date:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setTaskDatePickerVisible(true)}
          >
            <Text>
              {taskDate
                ? new Date(taskDate).toLocaleDateString()
                : "Select task date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTaskDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setTaskDate(date);
              setTaskDatePickerVisible(false);
            }}
            onCancel={() => setTaskDatePickerVisible(false)}
          />

          <Text style={styles.label}>Task Time:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setTaskTimePickerVisible(true)}
          >
            <Text>{taskTime ? taskTime : "Select task time"}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTaskTimePickerVisible}
            mode="time"
            onConfirm={(date) => {
              setTaskTime(
                date.toLocaleTimeString(navigation.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              );
              setTaskTimePickerVisible(false);
            }}
            onCancel={() => setTaskTimePickerVisible(false)}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
            style={styles.input}
            placeholder="Enter task description"
          />

          <TouchableOpacity style={styles.addButton} onPress={updateTrip}>
            <Text style={styles.buttonText}>Update Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "limegreen",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditTripScreen;
