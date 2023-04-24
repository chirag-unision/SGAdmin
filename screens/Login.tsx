import React, {useState} from 'react'
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native'
import axios from 'axios'

type Props = {}

export default function Login({}: Props) {
    const [user, setUser] = useState('')
    const [pswd, setPswd] = useState('')

    const apis= ()=>{
        axios.post('192.168.84.205:5000/iologin', {
            mobile: user,
            password: pswd
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>Mobile No.</Text>
        <TextInput style={styles.textBox} placeholder='Enter Mobile' onChange={(text)=>setUser(text)} />
        <Text style={styles.textStyle}>Password</Text>
        <TextInput style={styles.textBox} placeholder='Enter Password' onChange={(text)=>setPswd(text)} />
        <Pressable style={styles.button} onPress={apis}><Text>Login</Text></Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    textBox:{
        padding: 5,
        margin: 10,
        borderWidth: 0.5,
        width: 250
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 400
    },
    textStyle:{
        fontSize: 18    
    },
    button:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'skyblue',
        borderRadius: 10,
        width: 250,
        marginTop: 20

    }

});