import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather'; // You can choose other icons if needed

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
   const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigation = useNavigation()
  const initialValues: LoginFormValues = {
    email: 'sarower@mail.com',
    password: 'asddasdfasdfas',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = (values: LoginFormValues) => {
    // Here, you can handle the form submission (e.g., API call, navigate, etc.)
    // Alert.alert('Login Successful', `Email: ${values.email}\nPassword: ${values.password}`);

    navigation.navigate('(tabs)' as never)
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <View>

            <Input placeholder="Email" 
              value={values.email} 
              onChangeText={handleChange('email')} 
              onBlur={handleBlur('email')} 
              errorMessage={errors.email}
            />

            <Input placeholder="Password" 
              value={values.password} 
              onChangeText={handleChange('password')} 
              onBlur={handleBlur('password')} 
              errorMessage={errors.password}
              isPassword={true}
            />
            <View style={styles.forgotPassContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordScreen' as never)}>
                <Text>Forget Password?</Text>
              </TouchableOpacity>
            </View>
            <Button title="Login" variant='dark' onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
      <View style={styles.bottomActionContainer}>
        <Text style={styles.textCenter}>Don't have account? </Text>
        <Button title="Register" onPress={() => navigation.navigate('RegistrationScreen' as never)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'white'
  },
  forgotPassContainer:{
    flexDirection:'row-reverse',
    marginBottom:20
  },
  bottomActionContainer:{
    marginTop:50,
    gap:10,
  },
  textCenter:{
    textAlign:'center'
  }
});

export default LoginScreen;
