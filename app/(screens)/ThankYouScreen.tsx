import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/components/ui/Button";
import { useNavigation } from "@react-navigation/native";

import thankYou from "../../assets/images/thankYou.png";

const ThankYouScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("(tabs)" as never);
  };

  return (
    <View style={styles.container}>
      <Image source={thankYou} style={styles.image} />
      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.subtitle}>Thank you for using our app.</Text>
      <Button title="Go Back to Home" variant="dark" onPress={handleNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
});

export default ThankYouScreen;
