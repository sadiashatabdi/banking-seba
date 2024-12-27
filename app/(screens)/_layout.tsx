import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from '.';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SetPasswordScreen from './SetPasswordScreen';

export default function ScreenLayout() {
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();


  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:true, title:'Login'}} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown:true, title:'Forgot Password'}} />
      <Stack.Screen name="SetPasswordScreen" component={SetPasswordScreen} options={{headerShown:true, title: 'Set Password'}} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown:true, title:'Registration'}} />
  </Stack.Navigator>
  );
}
