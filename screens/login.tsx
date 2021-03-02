import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, KeyboardAvoidingView} from "react-native"
import {Button,Input,Image, } from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import { auth } from "../firebase";


export default function login({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("home")
            }
        })
        return unsubscribe;
    },[])
    const signin = ()=>{
        auth.signInWithEmailAndPassword(email,password).catch((error)=>{
            alert(error)
        })
    }

    return(
        <KeyboardAvoidingView  behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image source={{
                    uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }} style={styles.image}/>
                <View style ={styles.inputContainer}>
                    <Input value = {email} placeholder="Email" onChangeText={(text)=>setEmail(text)}/>
                    <Input value ={password}  placeholder="Pasword" secureTextEntry onChangeText={(text)=>setPassword(text)}/>
                </View>
                <Button containerStyle={styles.button} title="Login" onPress={()=>signin()}/>
                <Button containerStyle={styles.button} type="outline" title="Register" onPress={()=>navigation.navigate("register")}/>
                <View style={{height:200}}></View>
            </KeyboardAvoidingView>
        )

}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"

    }
});

