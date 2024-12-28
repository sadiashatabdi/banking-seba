import TextView from '@/components/ui/TextView';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const SupportScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextView>If you have any issues or need assistance, feel free to contact us:</TextView>
      <TouchableOpacity><TextView marginTop={5}>Email: Support@sadia.com</TextView></TouchableOpacity>
      <TouchableOpacity><TextView marginTop={5}>Phone: 01757669549</TextView></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default SupportScreen;
