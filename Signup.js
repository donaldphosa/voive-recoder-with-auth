import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {auth} from './firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useState } from 'react';


const SignUp = ({navigation}) => {
    const [Email,setEmail] = useState('')
    const [Password,setPassword] = useState('')
    const [visible,setVisible] = useState(false)
    const signup = async()=>{
        setVisible(true)
        await createUserWithEmailAndPassword(auth,Email,Password).then(()=>{
            setVisible(false),
            navigation.navigate('Home')
        }).catch((e)=>{
            setVisible(false)
            console.log(e);
        })
    }
  return (
    <View style={styles.container}>
                <Spinner visible={visible}/>
        <Text style={{marginBottom:50,fontSize:36,color:'blue',fontWeight:'bold'}}>Sign up</Text>
      <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='e.g email@gmail.com'/>
      <TextInput onChangeText={(text)=>setPassword(text)} style={styles.input} placeholder='password'/>
      <TouchableOpacity onPress={signup} style={styles.button}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
        <Text style={{fontSize:14,color:'#c7c7c7'}}>Already have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={{fontSize:14,color:'blue'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp

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