import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from 'expo-router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// Interface for form values
interface SetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const SetPasswordScreen: React.FC = () => {
  const navigation = useNavigation()
  const initialValues: SetPasswordFormValues = {
    password: '',
    confirmPassword: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password must be at most 16 characters')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain both letters and numbers')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Handle form submission
  const handleSetPassword = (values: SetPasswordFormValues) => {
    // Here, you can handle the password update (e.g., API call, navigate, etc.)
    // Alert.alert('Password Set Successfully', 'Your password has been set.');
    navigation.navigate('(tabs)' as never)
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSetPassword}
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
            {/* Password Input */}
            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              isPassword={true}
              touched={touched.password}
              errorMessage={errors.password}
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

            <Button title="Set Password" variant='dark' onPress={() => handleSubmit()} />
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
    alignItems: 'center',
    padding: 16,
  },
});

export default SetPasswordScreen;
