import { HomeScreen, ProfileScreen, UploadScreen, PostDetailsScreen } from "screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch } from "react-redux";
import { ReduxDispatcher } from 'redux/services/redux-dispatcher';

const ProfileStack = createNativeStackNavigator()
const AboutStack = createNativeStackNavigator()
const MainFeedStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()



const ProfileScreenStack = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: true, headerTitle: 'Create User'}}>
      <ProfileStack.Screen name={'ProfileScreen'} component={ProfileScreen}></ProfileStack.Screen>
    </ProfileStack.Navigator>
  )
}

const UploadScreenStack = () => {
  return (
    <AboutStack.Navigator screenOptions={{headerShown: true, headerTitle: 'Upload'}}>
      <AboutStack.Screen name={'UploadScreen'} component={UploadScreen}></AboutStack.Screen>
    </AboutStack.Navigator>
  )
}

const MainFeedScreenStack = () => {
  return (
    <MainFeedStack.Navigator screenOptions={{headerShown: true, headerTitle: 'Feed'}}>
      <MainFeedStack.Screen name={'HomeScreen'} component={HomeScreen}></MainFeedStack.Screen>
      <MainFeedStack.Screen name={'PostDetailsScreen'} component={PostDetailsScreen}></MainFeedStack.Screen>
    </MainFeedStack.Navigator>
  )
}

export const TabNavigator = () => {
  ReduxDispatcher.getInstance().setDispatcher(useDispatch())

  return (
      <Tab.Navigator 
        tabBarOptions={{
          showLabel: true,
        }}
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Home" component={MainFeedScreenStack} /> 
        <Tab.Screen name="Upload" component={UploadScreenStack} />
        <Tab.Screen name="Profile" component={ProfileScreenStack} />
      </Tab.Navigator>
  )
}
export default () => {
  return(
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  )
}