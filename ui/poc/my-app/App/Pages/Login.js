import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';

export default function Login() {
    WebBrowser.maybeCompleteAuthSession();
    const [accessToken,setAccessToken]=useState();
    const [userInfo,setUserInfo]=useState();
    //const {userData,setUserData}=useContext(AuthContext)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '873767065895-qbg3rj30q0gfec2kk8nckqe2m8in6k82.apps.googleusercontent.com',
        expoClientId:'873767065895-6nr8g9ol7b3i1js5qjcehf8obla97nu9.apps.googleusercontent.com'  
      });

      useEffect(()=>{
        if(response?.type=='success')
        {
            setAccessToken(response.authentication.accessToken);
            console.log(accessToken)
   
            getUserData();
        }
      },[response]);

      const getUserData=async()=>{
        try {
            const resp = await fetch(
              "https://www.googleapis.com/userinfo/v2/me",
              {
                headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
              }
            );
      
            const user = await resp.json();
            console.log("user Details",user) 
            setUserInfo(user); 
            //setUserData(user);
            //await Services.setUserAuth(user);
          } catch (error) {
            // Add your own error handler here
          }
      }
  return (
    <View>
        <Image source={require('./../assets/images/login.png')} />
        <View style={styles.container}>
             <Text style={styles.welcomeText}>Welcome to CodeBox</Text>
            <Text style={{textAlign:'center',marginTop:80,fontSize:20}}>Login/Signup</Text>
            <TouchableOpacity style={styles.button} 
            onPress={()=>promptAsync()}>
            <Ionicons name="logo-google" size={24}
             color="white" style={{marginRight:10}} />
                <Text style={{color:Colors.white}}>Sign In with Google</Text>
            </TouchableOpacity>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        marginTop:-25,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    welcomeText:{
        fontSize:35,
        textAlign:'center',
        fontWeight:'bold' 
    },
    button:{
        backgroundColor:Colors.primary,
        padding:10,
        margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
})
