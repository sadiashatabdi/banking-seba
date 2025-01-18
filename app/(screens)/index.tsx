import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import Button from "@/components/ui/Button";

import landingBg from "../../assets/images/landingBg.png";

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const accessLocalData = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("(tabs)" as never);
        }
      };
      accessLocalData();
    }
  }, [isFocused]);
  return (
    <ImageBackground source={landingBg} style={styles.container}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.title}>
          Your {"\n"}Ultimate{"\n"}Financial{"\n"}Companion
        </Text>
        <Button
          title="Get Started"
          variant="light"
          onPress={() => navigation.navigate("LoginScreen")} // Navigate to the Home screen
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#181818",
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "400",
    color: "#fff",
    marginBottom: 20,
  },
});

export default HomeScreen;
