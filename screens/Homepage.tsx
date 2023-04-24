import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import {backendURL} from "../app.json"
import axios from 'axios'

type Props = {}

export default function Homepage({}: Props) {

    const [data, setData]= useState([]);

  useEffect(()=> {
    axios.get(`${backendURL}/getReports`)
      .then(function (response) {   
        console.log(response.data.data);  
        setData(response.data.data)
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  },[]);

  const apis= ()=> {

  }

  return (
    <ScrollView>
        {data && data.map((item)=>{
        return  <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{
                        uri: 'https://cdn.telanganatoday.com/wp-content/uploads/2023/04/Telangana-Father-son-die-in-road-accident-in-Nalgonda.jpg',
                        }}
                    />
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', maxHeight: 30, paddingHorizontal: 10}}>
                            <Text style={styles.textStyle1}>{item.date}</Text>
                            <Text style={styles.textStyle1}>{item.time}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', maxHeight: 30, paddingHorizontal: 10}}>
                            <Text style={styles.textStyle2}>Severity: {item.severity}</Text>
                            <Text style={styles.textStyle2}>{item.status}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', maxHeight: 30, paddingHorizontal: 10}}>
                            <View></View>
                            <View></View>
                        </View>
                    </View>
                </View>
        })}
    </ScrollView>
  )
}

const styles= StyleSheet.create({
    container:{
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        borderWidth: 2,
        borderColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: 300,
        height: 180,
        borderRadius: 10
    },
    title:{
        fontWeight: '600',
        color: 'black'
    },
    textStyle1:{
        fontSize: 18,
        color: 'black'
    },
    textStyle2:{
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 5,
        paddingVertical: 6,
        backgroundColor: 'black',
        borderRadius: 5,
        color: 'white'
    }
})