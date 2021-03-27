import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from "react-native";

const AuthForm = ({ fetchAuth, isLoading }) => {
  const [loginText, onChangeLoginText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [visibleNotification, setVisibleNotification] = React.useState(false);

  const handleOpenNotification = () => {
    setVisibleNotification(true)
  }
  const onSubmit = () => {
    fetchAuth({ username: loginText, password }, handleOpenNotification)
  };

  return (
    <SafeAreaView style={styles.form} >
      {visibleNotification && <Text style={styles.notification}>Нерпавильный логин или пароль</Text>}
      <TextInput
        style={styles.input}
        onChangeText={onChangeLoginText}
        value={loginText}
        placeholder="Логин"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Пароль"
        secureTextEntry={true}
      />
      <Button
        title={"Войти"}
        onPress={onSubmit}
        disabled={isLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 70,
  },
  notification: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3
  },
});

export default AuthForm;
