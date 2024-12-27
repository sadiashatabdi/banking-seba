import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const UpdateProfileScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const initialValues: ProfileFormValues = {
    name: '',
    email: 'user@example.com',  // Example email
    phone: '9876543210',  // Example phone
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, 'Name must be at least 4 characters')
      .max(30, 'Name must be less than 30 characters')
      .required('Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password cannot be more than 16 characters')
      .matches(/[a-zA-Z]/, 'Password must contain letters')
      .matches(/\d/, 'Password must contain a number')
      .required('Password is required'),
  });

  const handleSubmit = (values: ProfileFormValues) => {
    // Submit the form and show an alert (you can send this data to an API)
    Alert.alert('Profile Updated', `Name: ${values.name}\nPassword: ${values.password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <View>
            {/* Name (Editable) */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Email (Disabled) */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              editable={false}
            />

            {/* Phone (Disabled) */}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={values.phone}
              editable={false}
            />

            {/* Password (Editable) */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!passwordVisible}
              />
              {/* Eye Icon to toggle password visibility */}
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#000" />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Update Profile" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
});

export default UpdateProfileScreen;
