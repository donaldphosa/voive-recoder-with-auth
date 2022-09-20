import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { Audio } from "expo-av";
export default function Home() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [response, setResponse] = React.useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );
        setRecording(recording);
      } else {
        setResponse("Please allow the app to access your microphone");
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
  }



  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minsDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minsDisplay) * 60);
    const secDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minsDisplay}:${secDisplay}`;
  };

  return (
   
    <View style={styles.container}>
      <Text>{response}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={recording ? stopRecording : startRecording}
      >
        {recording ? (
            <View style={styles.rec}>
            <Image
              style={styles.img}
              source={require("./assets/stop.png")}
            />
            <Text style={{marginLeft:"auto",marginRight:"auto"}}>Stop recording</Text>
          </View>
          
        ) : (
          <View style={styles.rec}>
          <Image
            style={styles.img}
            source={require("./assets/play.png")}
          />
          <Text style={{marginLeft:"auto",marginRight:"auto"}}>Start recording</Text>
        </View>
        )}
      </TouchableOpacity>
      {recordings.map((recordinglines, index)=>{
            return (
              <View style={[styles.row]} key={index}>
                <View>
                <Text style={styles.heading}>Recording 00{index + 1}</Text> 
                <Text style={styles.font}>{recordinglines.duration}</Text>
                </View>
                <TouchableOpacity onPress={()=>recordinglines.sound.replayAsync()} >
                <Image
                style={{width:20,height:20}}
                source={require("./assets/play2.png")}
                  />
                  {/* <Text>play</Text> */}
          </TouchableOpacity>
              </View>
            )
          })}
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#00cc8f",
    display:"flex",
    alignContent:"center",
    justifyContent:"center",
    marginBottom:40,
    elevation:4,
  },
  img:
  {
    width: 50,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  rec:{  
    marginLeft: "auto",
    marginRight: "auto",
    width:100,
    height:70},
  row: {
      display: 'flex',
      width: '100%',
      height: 56,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      elevation: 5,
      borderRadius: 5,
    },

});
