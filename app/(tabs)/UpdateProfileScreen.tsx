import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const UpdateProfileScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const initialValues: ProfileFormValues = {
    name: '',
    email: 'user@example.com',  // Example email
    phone: '9876543210',  // Example phone
    password: '',
    confirmPassword: '',
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values: ProfileFormValues) => {
    // Submit the form and show an alert (you can send this data to an API)
    Alert.alert('Profile Updated', `Name: ${values.name}\nPassword: ${values.password}`);
  };

  return (
    <View style={styles.container}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <View>
            {/* Name (Editable) */}
            <Input
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              touched={touched.name}
              errorMessage={errors.name}
            />

            <Input
              placeholder="Name"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              touched={touched.email}
              errorMessage={errors.email}
              disabled={true}
            />

            <Input
              placeholder="Phone"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              touched={touched.phone}
              errorMessage={errors.phone}
              disabled={true}
            />

            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              touched={touched.password}
              errorMessage={errors.password}
              isPassword={true}
              secureTextEntry={true}
            />
            <Input
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={true}
              isPassword={true}
              touched={touched.confirmPassword}
              errorMessage={errors.confirmPassword}
            />
            <Button title="Update Profile" variant='dark' onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
