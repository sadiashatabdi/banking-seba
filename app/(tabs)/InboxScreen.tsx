import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Transaction {
  id: string;
  sentNumber: string;
  amount: string;
  date: string;
  time: string;
}

const InboxScreen: React.FC = () => {
  // Sample mock data for transactions
  const transactions: Transaction[] = [
    { id: 'TXN001', sentNumber: '9876543210', amount: '$1000', date: '2024-12-26', time: '10:30 AM' },
    { id: 'TXN002', sentNumber: '9123456789', amount: '$500', date: '2024-12-25', time: '02:15 PM' },
    { id: 'TXN003', sentNumber: '9988776655', amount: '$2000', date: '2024-12-24', time: '09:00 AM' },
    { id: 'TXN004', sentNumber: '9776654433', amount: '$350', date: '2024-12-23', time: '04:45 PM' },
    { id: 'TXN005', sentNumber: '9554433221', amount: '$1200', date: '2024-12-22', time: '11:30 AM' },
    { id: 'TXN006', sentNumber: '9443322110', amount: '$800', date: '2024-12-21', time: '01:00 PM' },
    { id: 'TXN007', sentNumber: '9332211009', amount: '$450', date: '2024-12-20', time: '03:25 PM' },
    { id: 'TXN008', sentNumber: '9221100998', amount: '$700', date: '2024-12-19', time: '10:10 AM' },
    { id: 'TXN009', sentNumber: '9110999887', amount: '$1500', date: '2024-12-18', time: '08:30 AM' },
    { id: 'TXN010', sentNumber: '9009888776', amount: '$950', date: '2024-12-17', time: '02:00 PM' },
    { id: 'TXN011', sentNumber: '8998777665', amount: '$1350', date: '2024-12-16', time: '01:45 PM' },
    { id: 'TXN012', sentNumber: '8887666554', amount: '$2700', date: '2024-12-15', time: '09:15 AM' },
    { id: 'TXN013', sentNumber: '8776555443', amount: '$400', date: '2024-12-14', time: '11:00 AM' },
    { id: 'TXN014', sentNumber: '8665444332', amount: '$1750', date: '2024-12-13', time: '05:30 PM' },
    { id: 'TXN015', sentNumber: '8554333221', amount: '$500', date: '2024-12-12', time: '03:10 PM' },
    { id: 'TXN016', sentNumber: '8443222110', amount: '$900', date: '2024-12-11', time: '04:50 PM' },
    { id: 'TXN017', sentNumber: '8332211009', amount: '$1200', date: '2024-12-10', time: '02:30 PM' },
    { id: 'TXN018', sentNumber: '8221100998', amount: '$650', date: '2024-12-09', time: '09:50 AM' },
    { id: 'TXN019', sentNumber: '8110999887', amount: '$2100', date: '2024-12-08', time: '08:20 AM' },
    { id: 'TXN020', sentNumber: '8009888776', amount: '$350', date: '2024-12-07', time: '03:00 PM' }
  ];

  // Function to render each transaction item
  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionId}>Transaction ID: {item.id}</Text>
      <Text style={styles.transactionDetails}>Sent Number: {item.sentNumber}</Text>
      <Text style={styles.transactionDetails}>Amount: {item.amount}</Text>
      <Text style={styles.transactionDetails}>Date: {item.date}</Text>
      <Text style={styles.transactionDetails}>Time: {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});

export default InboxScreen;
