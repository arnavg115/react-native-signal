import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import login from './screens/login';
import register from './screens/register';
import home from "./screens/home"
import addchat from './screens/addchat';
import chat from './screens/chat';

const Stack = createStackNavigator();

const globalScreenOptions ={
  headerStyle :{backgroundColor:"#2C6BED"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white"
}


export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name = "login" component={login}/>
        <Stack.Screen options ={{title:"Register"}}name = "register" component={register} />
        <Stack.Screen name="home" component={home}/>
        <Stack.Screen name="AddChat" component={addchat}/>
        <Stack.Screen name = "chat" component={chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
