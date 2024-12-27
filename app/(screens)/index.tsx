import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Button from '@/components/ui/Button';

import landingBg from  '../../assets/images/landingBg.png'

type HomeScreenProps = {
  navigation: any; // Type for navigation prop
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={landingBg}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
      <Text style={styles.title}>Your {'\n'}Ultimate{'\n'}Financial{'\n'}Companion</Text>
      <Button
        title="Get Started"
        variant='light'
        onPress={() => navigation.navigate('LoginScreen')} // Navigate to the Home screen
      />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'#181818',
    paddingVertical:100,
    paddingHorizontal:20
  },
  title: {
    fontSize: 40,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 20,
  },
});

export default HomeScreen;
