import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {StyleSheet,View,KeyboardAvoidingView} from "react-native";
import {Button,Input,Text} from "react-native-elements";
import { auth } from "../firebase";


export default function register({navigation}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageurl, setUrl] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    },[navigation])
    const registerusr=()=>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageurl || "https://i.stack.imgur.com/l60Hf.png"
            })
            navigation.replace("home")
        })
        .catch((error)=>{
            alert(error);
        })
    }
    return(
        <KeyboardAvoidingView behavior="padding" style ={styles.container}>
            <StatusBar style = "light"/>

            <Text h3 style ={{marginBottom:50,marginTop:40}}> Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" value={name} onChangeText={(text)=>setName(text)}/>
                <Input placeholder="Email"  value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password"  secureTextEntry value={password} onChangeText={(text)=>setPassword(text)}/>
                <Input placeholder="profile picture URL (optional)" value = {imageurl} onChangeText={(text)=>setUrl(text)} onSubmitEditing={registerusr}/>

            </View>
            <Button raised title="Register" onPress={registerusr} style={styles.button}/>
            <View style={{height:200}}></View>
        </KeyboardAvoidingView>
    ) 

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,

    }
})