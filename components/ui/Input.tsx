import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps extends TextInputProps {
  label?: string; // Optional label
  errorMessage?: string; // Error message to show if validation fails
  containerStyle?: ViewStyle; // Style for the container (outside the TextInput)
  inputStyle?: TextStyle; // Style for the input field
  labelStyle?: TextStyle; // Style for the label text
  disabled?: boolean; // Disabled state for the input
  isPassword?: boolean;
  secureTextEntry?: boolean;
  touched?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  containerStyle,
  inputStyle,
  labelStyle,
  disabled = false,
  isPassword = false,
  secureTextEntry = false,
  touched = false,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(isPassword);
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle, disabled && styles.disabledInput]}
          editable={!disabled}
          secureTextEntry={passwordVisible}
        />
        {isPassword && <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </View>}
      </View>

      {touched && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'white'
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
