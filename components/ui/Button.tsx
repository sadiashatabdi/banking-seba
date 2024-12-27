import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
  variant?: 'light' | 'dark';   // light or dark variant
  disabled?: boolean;           // button disabled state
  onPress: () => void;          // onPress handler for the button
  title: string;                // button text
};

const Button: React.FC<ButtonProps> = ({ variant = 'light', disabled = false, onPress, title }) => {
  // Define dynamic styles based on the variant and disabled state
  const buttonStyle = [
    styles.button,
    variant === 'light' ? styles.lightBackground : styles.darkBackground,
    disabled && styles.disabledButton,
  ];

  const textStyle = [
    styles.text,
    variant === 'light'? styles.textLight:styles.textDark,
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,  // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBackground: {
    backgroundColor: 'white',  // Light variant background color
  },
  darkBackground: {
    backgroundColor: '#181818',  // Dark variant background color
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',  // Disabled background color
  },
  text: { // White text color
    fontSize: 16,
    fontWeight: '600',
  },
  textLight:{
    color:'#181818'
  },
  textDark:{
    color:'white'
  },
  disabledText: {
    color: '#a0a0a0',  // Disabled text color
  },
});

export default Button;
