import { HomeScreen, ProfileScreen, AboutScreen, PostDetailsScreen } from "screens";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons  from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator()
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

// export const TabNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => (
//           {
//             tabBarIcon: ({ focused, color }) => {
//               let iconName;
//               if (route.name === 'HomeScreen') {
//                 iconName = focused
//                   ? 'search'
//                   : 'search';
//                 return <Ionicons name={iconName} color={color} style={{ fontSize: 28 }} />
//               } else if (route.name === 'ProfileScreen') {
//                 iconName = focused
//                   ? 'house'
//                   : 'home';
//                 return <Ionicons name={iconName} color={color} style={{ fontSize: 28 }} />
//               } else if (route.name === 'AboutScreen') {
//                 iconName = focused
//                   ? 'home'
//                   : 'home';
//                 return <Ionicons name={iconName} color={color} style={{ fontSize: 28 }} />
//               } 
//               // You can return any component that you like here!

//             },
//             tabBarStyle: {
//               backgroundColor: '#164AFE', height: '8%',
//             },
//             tabBarActiveTintColor: '#FFFFFF',
//             tabBarInactiveTintColor: '#BBBFC2',
//             tabBarLabelStyle: {
//               fontSize: 16,
//               marginTop: -5,
//               marginBottom: 5
//             },
//             headerShown: false,
//             tabBarHideOnKeyboard: true
//           })}
//       >
//         <Tab.Screen name="HomeScreen" component={HomeScreen} /> 
//         <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//         <Tab.Screen name="AboutScreen" component={AboutScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   )
  
// }
export default () => {
  return(
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}