import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { auth } from './firebase.config';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';


const Login = ({navigation}) => {
    const [Email,setEmail] = useState('')
    const [Password,setPassword] = useState('')
    const [visible,setVisible] = useState(false)
    const login = async () =>{
      setVisible(true)
      signInWithEmailAndPassword(auth,Email,Password).then(()=>{ 
        navigation.navigate('Home') 
        setVisible(false)
      }).catch((error)=>{
        Alert.alert(error.message)
        setVisible(false)
      })
     
    }
  return (
    <View style={styles.container}>
        <Spinner visible={visible}/>
        <Text style={{marginBottom:50,fontSize:36,color:'blue',fontWeight:'bold'}}>Login</Text>
      <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='e.g email@gmail.com'/>
      <TextInput onChangeText={(text)=>setPassword(text)} style={styles.input} placeholder='password'/>
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
        <Text  style={{fontSize:14,color:'#c7c7c7'}}>Don't have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <Text style={{fontSize:14,color:'blue'}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        marginTop:30,
        width:'80%',
        borderColor:'#ccc',
        padding:10,
        borderWidth:1,
        borderRadius:10
    },
    button:{
        width:'80%',
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        marginTop:30,
        borderRadius:10
    },
    text:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    }
})