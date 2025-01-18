import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import KeyboardAvoidingViewContainer from "@/components/ui/KeyboardAvoidingViewContainer";
import Api from "@/services/Api";

interface ServiceFormValue {
  to: string;
  amount: number;
}

const ServiceScreen: React.FC = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const initialValues: ServiceFormValue = {
    to: __DEV__ ? "01753945342" : "",
    amount: __DEV__ ? 100 : 0,
  };

  const validationSchema = Yup.object({
    to: Yup.string().required("Phone number is required"),
    amount: Yup.number().required("Amount is required"),
  });

  const handleSend = (values: any) => {
    values.type = route.params?.type.toUpperCase() ?? "Send Money";
    mutateAsync(values, {
      onSuccess: () => {
        navigation.navigate("ThankYouScreen" as never);
      },
      onError: (error) => {
        Alert.alert("Transaction Error", error.message);
      },
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => Api.post("transaction/send", payload, false),
  });

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
                value={values.to}
                onChangeText={handleChange("to")}
                onBlur={handleBlur("to")}
                errorMessage={errors.to}
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
