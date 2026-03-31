import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default class Cadastro extends Component {
  state = {
    email: "",
    password: "",
    cpf: "",
    curso: "",
    telefone: "",
  };

  handleCadastro = async () => {
    try {
      const { email, password, cpf, curso, telefone } = this.state;

      if (!email.trim() || !password.trim() || !cpf.trim() || !curso.trim() || !telefone.trim()) {
        alert("Preencha todos os campos!");
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      const newUser = {
        id: Date.now().toString(),
        email: normalizedEmail,
        password,
        cpf: cpf.trim(),
        curso: curso.trim(),
        telefone: telefone.trim(),
      };

      const usersStorage = await AsyncStorage.getItem("users");
      const users = usersStorage ? JSON.parse(usersStorage) : [];

      const alreadyExists = users.some((u) => u.email === normalizedEmail);
      if (alreadyExists) {
        alert("Já existe usuário com esse e-mail.");
        return;
      }

      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("Usuário cadastrado com sucesso!");
      this.props.navigation.navigate("Login");
    } catch {
      alert("Erro ao cadastrar usuário.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CADASTRO</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#9F9F9F"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#9F9F9F"
          value={this.state.cpf}
          onChangeText={(cpf) => this.setState({ cpf })}
        />

        <TextInput
          style={styles.input}
          placeholder="Curso"
          placeholderTextColor="#9F9F9F"
          value={this.state.curso}
          onChangeText={(curso) => this.setState({ curso })}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#9F9F9F"
          value={this.state.telefone}
          onChangeText={(telefone) => this.setState({ telefone })}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#9F9F9F"
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={this.handleCadastro}>
          <Text style={styles.buttonTextDark}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonTextLight}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    backgroundColor: "#161616",
    color: "#ffffff",
  },
  buttonPrimary: {
    width: "100%",
    backgroundColor: "#FF4D5A",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonSecondary: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#FF4D5A",
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
    color: "#FF4D5A",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});