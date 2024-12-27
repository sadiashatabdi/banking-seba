import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

const SupportScreen: React.FC = () => {
  
  const handleEmailSupport = () => {
    const email = 'support@app.com'; // Replace with your actual support email
    const subject = 'Support Request';
    const body = 'Please describe your issue here...';
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const handleCallSupport = () => {
    const phoneNumber = '1234567890'; // Replace with your actual support phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.text}>
        If you have any issues or need assistance, feel free to contact us:
      </Text>
      
      {/* Support Email */}
      <Text style={styles.contactText} onPress={handleEmailSupport}>
        Email: support@app.com
      </Text>
      
      {/* Support Phone */}
      <Text style={styles.contactText} onPress={handleCallSupport}>
        Phone: 123-456-7890
      </Text>

      {/* Support Buttons */}
      <Button title="Contact Support via Email" onPress={handleEmailSupport} />
      <Button title="Call Support" onPress={handleCallSupport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 18,
    color: '#0066cc',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SupportScreen;
