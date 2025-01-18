import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Container from "@/components/Container";
import CreditCard from "@/components/CreditCard";
import TextView from "@/components/ui/TextView";

import sendMoney from "../../assets/images/sendMoney.png";
import mobileRecharge from "../../assets/images/mobileRecharge.png";
import cashOut from "../../assets/images/cashOut.png";
import makePayment from "../../assets/images/makePayment.png";
import gift from "../../assets/images/gift.png";
import donation from "../../assets/images/donation.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Api from "@/services/Api";

const DashboardScreen = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [name, setName] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["user-balance"],
    queryFn: () => Api.get("user/balance", {}),
  });

  useEffect(() => {
    const getData = async () => {
      const id = await AsyncStorage.getItem("id");
      const ubalance = await AsyncStorage.getItem("balance");
      const uname = await AsyncStorage.getItem("name");
      const create_at = (await AsyncStorage.getItem("created_at")) ?? "";

      setCardNumber(
        create_at?.slice(0, 4) +
          create_at?.slice(5, 10).replace("-", "") +
          id?.padStart(8, "0")
      );
      setName(uname ?? "Sadia");
      setBalance(ubalance ?? "0");
    };

    getData();
    refetch();
  }, [isFocused]);

  const services = [
    {
      id: 1,
      name: "Send Money",
      icon: sendMoney,
    },
    {
      id: 2,
      name: "Mobile Recharge",
      icon: mobileRecharge,
    },
    {
      id: 3,
      name: "Cash Out",
      icon: cashOut,
    },
    {
      id: 4,
      name: "Make Payment",
      icon: makePayment,
    },
    {
      id: 5,
      name: "Gift",
      icon: gift,
    },
    {
      id: 6,
      name: "Donation",
      icon: donation,
    },
  ];
  return (
    <Container>
      <CreditCard
        cardNumber={cardNumber}
        cardHolder={name}
        expiryDate="12/30"
        balance={data?.balance}
      />
      <View style={styles.services}>
        {services.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceItem}
            onPress={() => {
              router.push({
                pathname: "/(screens)/ServiceScreen",
                params: { type: item.name }, // Parameters to pass
              });
            }}
          >
            <Image source={item.icon} style={styles.serviceIcon} />
            <TextView fontSize={16} textAlign="center">
              {item.name}
            </TextView>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  services: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    padding: 10,
    backgroundColor: "#ebe0e0",
    borderRadius: 10,
    width: "48%",
    marginBottom: 20,
    alignItems: "center",
  },
  serviceIcon: {
    width: 80,
    height: 80,
  },
});

export default DashboardScreen;
