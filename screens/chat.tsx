import React, { useEffect, useLayoutEffect, useState } from "react"
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Keyboard} from "react-native";
import { Avatar } from "react-native-elements"
import {AntDesign,FontAwesome, Ionicons} from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar";
import Customlistitem from "../components/Customlistitem";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { db,auth } from "../firebase";
import * as firebase from "firebase";
export default function chat({navigation, route}){
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerTitleAlign:"left",
            headerBackTitleVisible:false,
            headerTitle:()=>{
                return(
                <View style={styles.nav}>
                    <Avatar rounded source={{uri:"https://i.stack.imgur.com/l60Hf.png"}}/>
                <Text style={styles.navtxt}>{route.params.chatName}</Text>
                </View>)
            },
            headerLeft:()=>{
                return(
                    <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white"/>
                    </TouchableOpacity>
                )
            },
            headerRight:()=>{
                return(
                    <View style = {styles.headericons}>
                        <TouchableOpacity>
                            <FontAwesome name="video-camera" size={24} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Ionicons name = "call" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [navigation,route])

    useEffect(()=>{
        const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy("timeStamp").onSnapshot(snapshot=>
            setMessages(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
            }))
        )
        )

        return unsubscribe;
    },[])
    const sendmessage = ()=>{
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:message,
            displayName:auth.currentUser?.displayName,
            email:auth.currentUser?.email,
            photoURL:auth.currentUser?.photoURL
        }),
        setMessage("")

    }
    const elements = [];
    
    
    return(
        <SafeAreaView style={styles.mainview}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
                behavior={Platform.OS==="ios"?"padding":"height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                </TouchableWithoutFeedback>
                <>
                    <ScrollView>
                    {messages.map(element=>{
                        if(element.data.displayName === auth.currentUser?.displayName){
                            return(
                            <View style={styles.sender}>
                                <Text>{element.data.message}</Text>
                            </View>)
                        }
                        else{
                            return(
                            <View style={styles.receiver}>
                                <Text>{element.data.message}</Text>
                            </View>)
                        }
                    })}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput value={message} placeholder="Message" style={styles.txtinpt} onSubmitEditing={sendmessage} onChangeText={(text)=>{setMessage(text)}}></TextInput>
                        <TouchableOpacity activeOpacity={0.5} onPress={sendmessage}>
                            <Ionicons name="send" size={24} color="#2B68E6"/>
                        </TouchableOpacity>
                    </View>
                </>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    nav:{
        flexDirection:"row",
        alignItems:"center",
    },
    navtxt:{
        color:"white",
        marginLeft:10,
        fontWeight:"700"
    },
    back:{
        marginLeft:10
    },
    headericons:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:80,
        marginRight:20
    },
    mainview:{
        flex:1,
        backgroundColor:"white"
    },
    container:{
        flex:1,
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    txtinpt:{
        bottom:0,
        height:40,
        flex:1,
        marginRight: 15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"#56a3f0",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    }
})