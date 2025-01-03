import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "expo-router";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import KeyboardAvoidingViewContainer from "@/components/ui/KeyboardAvoidingViewContainer";

interface LoginFormValues {
  phone: string;
  amount: number;
}

const ServiceScreen: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: LoginFormValues = {
    phone: "01753945342",
    amount: 100,
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone number is required"),
    amount: Yup.number().required("Amount is required"),
  });

  const handleSend = (values: LoginFormValues) => {
    navigation.navigate("ThankYouScreen" as never);
  };

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSend}
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
                placeholder="Phone Number"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                errorMessage={errors.phone}
                keyboardType="numeric"
              />

              <Input
                placeholder="Amount"
                value={`${values.amount}`}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                errorMessage={errors.amount}
              />

              <Button
                title="Send"
                variant="dark"
                onPress={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
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
});

export default ServiceScreen;
