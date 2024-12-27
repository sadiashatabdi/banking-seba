import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather'; // You can choose other icons if needed

import Button from '@/components/ui/Button';

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
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <View>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
              
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
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
    // alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
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
