import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

import creditCard from "../assets/images/CreditCardBg.png";

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
}) => {
  const formatCardNumber = (number: string) =>
    number.replace(/(\d{4})/g, "$1 ").trim();

  const [balance, setBalance] = useState("Your Balance");

  return (
    <View style={styles.card}>
      <ImageBackground
        source={creditCard}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.topSection}>
          <Pressable onPress={() => setBalance("2000.00 TK")}>
            <Text style={styles.bankName}>{balance}</Text>
          </Pressable>
          <Text style={styles.bankName}>Banking Seba</Text>
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
        </View>
        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.label}>Card Holder</Text>
            <Text style={styles.cardHolder}>{cardHolder}</Text>
          </View>
          <View>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.expiryDate}>{expiryDate}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    alignSelf: "center",
  },
  background: {
    flex: 1,
    justifyContent: "space-between",
    padding: 30,
  },
  imageStyle: {
    borderRadius: 12,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bankName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  middleSection: {
    alignItems: "flex-end",
    marginTop: -20,
  },
  cardNumber: {
    fontSize: 22,
    color: "#fff",
    letterSpacing: 2,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 12,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  cardHolder: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
  },
  expiryDate: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
    marginRight: 80,
  },
});

export default CreditCard;
