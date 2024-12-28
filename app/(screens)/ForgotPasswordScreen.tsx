import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from 'expo-router';
import Input from '@/components/ui/Input';
import TextView from '@/components/ui/TextView';

import Button from '@/components/ui/Button';

// Interface for form values
interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation()
  const initialValues: ForgotPasswordFormValues = {
    email: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  // Handle form submission
  const handleForgotPassword = (values: ForgotPasswordFormValues) => {
    // You can replace this with an API call or other logic to reset the password
    navigation.navigate('SetPasswordScreen' as never)
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
        }) => (
          <View>
            <Input
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              touched={touched.email}
              errorMessage={errors.email}
            />

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)}>
              <TextView textAlign='right' marginBottom={10}>Can you remember password?</TextView>
            </TouchableOpacity>
            <Button title="Send Reset Link" variant='dark' onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default ForgotPasswordScreen;
