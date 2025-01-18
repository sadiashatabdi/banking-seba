import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import Api from "@/services/Api";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  id: string;
  phone: string;
  amount: string;
  created_at: string;
  type: string;
}

const InboxScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const [myPhone, setMyPhone] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["transaction-history"],
    queryFn: () => Api.get("transaction/history", {}),
  });

  useEffect(() => {
    refetch();
    const myData = async () => {
      const myPhone = (await AsyncStorage.getItem("phone")) ?? "";
      setMyPhone(myPhone);
    };

    myData();
  }, [isFocused]);

  // Function to render each transaction item
  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.transactionItem}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.transactionId}>Transaction ID:</Text>
          <Text style={styles.transactionId}>{item.id.padStart(8, "0")}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.transactionDetails}>Transaction Type:</Text>
          <Text style={styles.transactionDetails}>
            {myPhone === item.phone && item.type === "SEND MONEY"
              ? "RECEVED"
              : item.type}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.transactionDetails}>Sent To: </Text>
          <Text style={styles.transactionDetails}>{item.phone}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.transactionDetails}>Amount: </Text>
          <Text
            style={
              (styles.transactionDetails,
              { color: myPhone === item.phone ? "green" : "red" })
            }
          >
            {myPhone === item.phone ? "+" : "-"}
            {item.amount}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.transactionDetails}>Date Time:</Text>
          <Text style={styles.transactionDetails}>{item.created_at}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>
            <Text>No transactions found</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  transactionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
});

export default InboxScreen;
