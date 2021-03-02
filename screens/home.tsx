import React, { useEffect, useLayoutEffect, useState } from "react";
import { View,Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import {Avatar} from "react-native-elements";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import Customlistitem from "../components/Customlistitem";
import { auth, db } from "../firebase";



export default function home({navigation}){
    const [chats, setChats] = useState([]);
    const signOutUser= ()=>{
        auth.signOut().then(()=>{
            navigation.replace("login")
        })
    }
    useEffect(()=>{
        const unsubscribe = db.collection("chats").onSnapshot((snapshot)=>
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
            }))
        )
        )

        return unsubscribe;
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Signal",
            headerStyle :{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTinitColor:"black",
            headerLeft:()=>{
                return(
                    <View style={{marginLeft:20}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                            <Avatar rounded source={ {uri: auth?.currentUser?.photoURL}} />
                        </TouchableOpacity>
                    </View>
                )
            },
            headerRight:()=>{
                return(
                    <View style = {{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        width:80,
                        marginRight:20
                    }}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <AntDesign name = "camerao" size={24} color="black"/>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("AddChat")}>
                            <SimpleLineIcons name="pencil" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>

                )
            }
        })
    },[navigation])
    const enterChat = (id, chatName)=>{
        navigation.navigate("chat", {
            id, chatName
        })
    }
    return(
        
        <SafeAreaView>
            <ScrollView>
                {chats.map(element=>(
                    <Customlistitem key = {element.id}chatName={element.data.chatName} id = {element.id} enterChat={enterChat}/>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}


