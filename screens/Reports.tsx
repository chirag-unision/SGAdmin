import * as React from 'react'
import { useState } from 'react'
import {View, Text, TextInput, StyleSheet, Pressable, ScrollView} from 'react-native'
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import {backendURL} from "../app.json"
import { format } from "date-fns";


type Props = {}

export default function Reports({}: Props) {
  let d= new Date();
  const [date, setDate] = useState(d)
  const [time, setTime] = useState(d.getTime())
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('')
  const [type, setType] = useState('')
  const [faults, setFaults] = useState('')
  const [message,setMessage] = useState('');

  const [lat, setLat] = useState(0);
  const [lan, setLan] = useState(0);

  const getLocation= ()=>{
    Geolocation.getCurrentPosition((data)=>{
        console.log(data.coords);
        setLat(data.coords.latitude); 
        setLan(data.coords.longitude);
    })
  }

  const apis= ()=>{
    console.log(date+''+time+''+lat+''+lan+''+title+''+description+''+type+''+faults+''+severity);
    fetch(`${backendURL}/addReport`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
        io_id: 498234,
        date: format(new Date( date),"yyyy-MM-dd"),
        time: format(new Date( time),"h:i:s"),
        LatLong: JSON.stringify({Lat: lat, Long: lan}),
        title: title,
        description: description,
        vehicle_type: type,
        faults: faults,
        severity: severity,
        })
}).then(response => {console.log(response); 
    if(response.status==200){
        setMessage("Report Submitted sucessfully!")
    }else{
        setMessage("Report not Submitted ")
    }
})

.catch(error => {
  console.error(error);
});
    
//     axios({
//         method: 'post',
//         url: 'https://c75f-125-21-249-98.ngrok-free.app/addReport',
//         headers:{
//              Accept: "application/json"
//         },
//         data: JSON.stringify({
//            io_id: 498234,
//            date: format(new Date( date),"yyyy-MM-dd"),
//            time: format(new Date( date),"h:i:s"),
//            LatLong: JSON.stringify({Lat: lat, Long: lan}),
//            title: title,
//            description: description,
//            vehicle_type: type,
//            faults: faults,
//            status:0,
//            severity: severity,
//            upvotes:0
//            })
//       })
//       .then(function (response) {
//         console.log(JSON.stringify(response));
//       })
//       .catch(function (error) {
//         console.log(JSON.stringify(error));
//       });
  }

  return (
    <ScrollView>
        
        <View style={styles.boxTitle}><Text>{message}</Text></View>
        <View style={styles.formContainer}>
            <Text style={styles.headLine}>Reports</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Title</Text>
                <TextInput style={styles.inputBox} onChangeText={(text) => setTitle(text)} placeholder='Prompt Here' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Description</Text>
                <TextInput style={styles.inputBox} onChangeText={(text)=> setDescription(text)} placeholder='Prompt Here' />
            </View>
            <View style={styles.inputContainer}>
                {!lat && !lan && <Pressable style={styles.button} onPress={getLocation}>
                <Text style={{color: 'white', textAlign: 'center'}}>Get Location</Text>
                </Pressable>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Date</Text>
                <DatePicker mode={'date'} date={date} onDateChange={setDate} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Time</Text>
                <DatePicker mode={'time'} date={date} onDateChange={(text)=> setDate(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Severity</Text>
                <TextInput style={styles.inputBox} onChangeText={(text)=> setType(text)} placeholder='Prompt Here' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Type</Text>
                <TextInput style={styles.inputBox} onChangeText={(text)=> setType(text)} placeholder='Prompt Here' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.boxTitle}>Fault</Text>
                <TextInput style={styles.inputBox} onChangeText={(text)=> setFaults(text)} placeholder='Prompt Here' />
            </View>
            <View>
                {/* Submit Btn */}
                <Pressable
                onPress={apis}
                style={styles.button}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

// Date
// Time
// Location
// Title
// Description
// Type
// Images
// Severity
// Cause of Accident
// Fault

const styles= StyleSheet.create({
    formContainer:{
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    headLine:{
        fontSize: 25,
        fontWeight: '600',

    },
    inputBox:{
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 5
    },
    boxTitle:{
        position: "absolute",
        top: -12,
        left: 15,
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: "white",
        zIndex: 5
    },
    inputContainer:{
        marginVertical: 20,
    },
    button:{
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
    }
});