import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "expo-router";
import Button from "@/components/ui/Button";
import KeyboardAvoidingViewContainer from "@/components/ui/KeyboardAvoidingViewContainer";
import Input from "@/components/ui/Input";
import Gap from "@/components/ui/Gap";
import { useMutation } from "@tanstack/react-query";
import Api from "@/services/Api";

// Interface for form values
interface RegistrationFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: RegistrationFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name must be at least 4 characters")
      .max(30, "Name must not exceed 30 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "Password must contain both letters and numbers"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle form submission
  const handleRegistration = (values: any) => {
    mutateAsync(values, {
      onSuccess() {
        navigation.navigate("LoginScreen" as never);
      },
      onError(error) {
        Alert.alert("Registration Error", error.message);
      },
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => Api.post("auth/register", payload, false),
  });

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegistration}
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
                placeholder="Full Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                errorMessage={errors.name}
                touched={touched.name}
              />
              <Input
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errorMessage={errors.email}
                touched={touched.email}
              />
              <Input
                placeholder="Phone Number"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                errorMessage={errors.phone}
                touched={touched.phone}
                keyboardType="numeric"
              />
              <Input
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errorMessage={errors.password}
                touched={touched.password}
              />
              <Input
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                errorMessage={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              <Button
                title="Register"
                variant="dark"
                onPress={() => handleSubmit()}
                isPending={isPending}
              />
            </View>
          )}
        </Formik>

        <View style={styles.actionContainer}>
          <Text>Already have account? </Text>
          <Button
            title="Login"
            variant="light"
            onPress={() => navigation.navigate("LoginScreen" as never)}
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
  },
  actionContainer: {
    marginTop: 50,
    gap: 10,
  },
});

export default RegistrationScreen;
