import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const usersStorage = await AsyncStorage.getItem("users");
    const users = usersStorage ? JSON.parse(usersStorage) : [];

    if (!users.length) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (u) => u.email === normalizedEmail && u.password === password
    );

    if (!foundUser) {
      alert("E-mail ou senha inválidos!");
      return;
    }

    await AsyncStorage.setItem("loggedUser", JSON.stringify(foundUser));
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#9F9F9F"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#9F9F9F"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
        <Text style={styles.buttonTextDark}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonTextLight}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF4D5A",
    marginBottom: 22,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  buttonPrimary: {
    width: "100%",
    backgroundColor: "#fc1e2d",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonSecondary: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextDark: {
    color: "#0D0D0D",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonTextLight: {
    color: "#f70414",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Login;