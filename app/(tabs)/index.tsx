import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Container from "@/components/Container";
import CreditCard from "@/components/CreditCard";
const DashboardScreen = () => {
  return (
    <Container>
      <CreditCard
        cardNumber="1234567812345678"
        cardHolder="SADIA SHATABDI"
        expiryDate="12/30"
      ></CreditCard>
      <View>
        <Text>Hello</Text>
      </View>
    </Container>
  );
};

export default DashboardScreen;
