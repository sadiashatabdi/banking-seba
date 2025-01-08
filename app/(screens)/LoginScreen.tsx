import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "expo-router";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import KeyboardAvoidingViewContainer from "@/components/ui/KeyboardAvoidingViewContainer";
import { useMutation } from "@tanstack/react-query";
import Api from "@/services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginFormValues {
  email_or_phone: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: LoginFormValues = {
    email_or_phone: "sadia@hello.com",
    password: "123456",
  };

  const validationSchema = Yup.object({
    email_or_phone: Yup.string()
      // .email_or_phone("Invalid email address")
      .required("Email or phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => Api.post("auth/login", payload, false),
  });

  const handleLogin = async (values: any) => {
    mutateAsync(values, {
      onSuccess(response) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("balance", response.user.balance);
        AsyncStorage.setItem("email", response.user.email);
        AsyncStorage.setItem("id", response.user.id);
        AsyncStorage.setItem("name", response.user.name);
        AsyncStorage.setItem("phone", response.user.phone);
        AsyncStorage.setItem("status", response.user.status);
        navigation.navigate("(tabs)" as never);
      },
      onError(error) {
        Alert.alert("Login Error", error.message);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("balance");
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("id");
        AsyncStorage.removeItem("name");
        AsyncStorage.removeItem("phone");
        AsyncStorage.removeItem("status");
      },
    });
  };

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
                placeholder="Email"
                value={values.email_or_phone}
                onChangeText={handleChange("email_or_phone")}
                onBlur={handleBlur("email_or_phone")}
                errorMessage={errors.email_or_phone}
                touched={touched.email_or_phone}
              />

              <Input
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errorMessage={errors.password}
                isPassword={true}
                touched={touched.password}
              />
              <View style={styles.forgotPassContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ForgotPasswordScreen" as never)
                  }
                >
                  <Text>Forget Password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="Login"
                variant="dark"
                onPress={() => handleSubmit()}
                isPending={isPending}
              />
            </View>
          )}
        </Formik>
        <View style={styles.bottomActionContainer}>
          <Text style={styles.textCenter}>Don't have account? </Text>
          <Button
            title="Register"
            onPress={() => navigation.navigate("RegistrationScreen" as never)}
          />
        </View>
      </View>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  forgotPassContainer: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  bottomActionContainer: {
    marginTop: 50,
    gap: 10,
  },
  textCenter: {
    textAlign: "center",
  },
});

export default LoginScreen;
