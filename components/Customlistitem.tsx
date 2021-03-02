import React from "react";
import {StyleSheet, View} from "react-native"
import { Avatar, ListItem } from "react-native-elements";



export default function customlistitem({id, chatName, enterChat}){
    return(
        
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar rounded source={{uri:"https://i.stack.imgur.com/l60Hf.png"}}/>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}




const styles = StyleSheet.create({

})