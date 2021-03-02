import React, { useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Icon, Input } from "react-native-elements"
import { db } from "../firebase";
export default function addchat({navigation}){
    const [input, setInput] = useState("");
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:"Chats",

        })

    },[navigation])
    const createChat = async ()=>{
        await db.collection("chats").add({
            chatName:input
        }).then(()=>{
            navigation.goBack()
        }).catch((error)=>{
            alert(error)
        })
    }
    return(
        <View style={styles.container}>
            <Input placeholder="Enter a chat name" value={input} onChangeText={(text)=>setInput(text)} leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black"/>}/>
            <Button title="Create a new Chat" onPress={createChat}/>
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})


