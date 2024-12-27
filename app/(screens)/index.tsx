import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

type HomeScreenProps = {
  navigation: any; // Type for navigation prop
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
    //   source={require('./assets/background.jpg')} // Update path if necessary
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to My App</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('LoginScreen')} // Navigate to the Home screen
          color="#fff"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    width: '100%',
    height: '100%',
    padding:30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});

export default HomeScreen;
