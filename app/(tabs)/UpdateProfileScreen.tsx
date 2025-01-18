import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Gap from "@/components/ui/Gap";
import Api from "@/services/Api";

interface ProfileFormValues {
  name: string;
}

const UpdateProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: ProfileFormValues = {
    name: "",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => Api.put("profile/update", payload, false),
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name must be at least 4 characters")
      .max(30, "Name must be less than 30 characters")
      .required("Name is required"),
  });

  const handleSubmit = (values: any) => {
    // Submit the form and show an alert (you can send this data to an API)
    mutateAsync(values, {
      onSuccess: () => {
        AsyncStorage.setItem("name", values.name);
        Alert.alert("Success", "Your profile updated");
      },
      onError: (error) => {
        Alert.alert("Update Error", error.message);
      },
    });
  };

  const handleLogout = async () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("balance");
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("phone");
    AsyncStorage.removeItem("status");
    AsyncStorage.removeItem("created_at");
    navigation.navigate("(screens)" as never);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            {/* Name (Editable) */}
            <Input
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              touched={touched.name}
              errorMessage={errors.name}
            />

            <Button
              title="Update Profile"
              variant="dark"
              onPress={() => handleSubmit()}
            />
            <Gap size={50} />
            <Button title="Logout" variant="light" onPress={handleLogout} />
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
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
});

export default UpdateProfileScreen;
