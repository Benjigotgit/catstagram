import { HomeScreen, ProfileScreen, AboutScreen, PostDetailsScreen } from "screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons  from 'react-native-vector-icons/Ionicons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen}></Stack.Screen>
      <Stack.Screen name={'PostDetailsScreen'} component={HomeScreen}></Stack.Screen>
      <Stack.Screen name={'ProfileScreen'} component={HomeScreen}></Stack.Screen>
      <Stack.Screen name={'AboutScreen'} component={HomeScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export const TabNavigator = () => {
  return (
      <Tab.Navigator 
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} /> 
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        <Tab.Screen name="AboutScreen" component={AboutScreen} />
      </Tab.Navigator>
  )
}
export default () => {
  return(
    <NavigationContainer>
      {/* <AppStack /> */}
      <TabNavigator/>
    </NavigationContainer>
  )
}