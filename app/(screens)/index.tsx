import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Button from '@/components/ui/Button';

import landingBg from  '../../assets/images/landingBg.png'

type HomeScreenProps = {
  navigation: any; // Type for navigation prop
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View
      style={styles.container}
    >
      <StatusBar style="light" />

      <Image source={landingBg} />
      <View>
      <Text style={styles.title}>Mobile Banking with world loves</Text>
      <Text style={styles.subTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
      <Button
        title="Get Started"
        variant='light'
        onPress={() => navigation.navigate('LoginScreen')} // Navigate to the Home screen
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#181818',
    paddingVertical:100
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 20,
  },
  subTitle:{
    fontSize:20,
    fontWeight: '200',
    color: '#fff',
    marginBottom:20
  }
});

export default HomeScreen;
