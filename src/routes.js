import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import Main from "./pages/main";
import Details from "./pages/films";
import Cadastro from "./pages/cadastro";

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#0D0D0D",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: "#f11826",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#ff0011",
  },
  cardStyle: {
    backgroundColor: "#0D0D0D",
  },
};


export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "MovieCards" }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={({ navigation, route }) => ({
            title: "FILMES",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  const logout = route.params?.onLogout;
                  if (logout) logout();
                }}
                style={{ marginRight: 14 }}
              >
                <Text style={{ color: "#ff0011", fontWeight: "bold" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "DETALHES DO FILME" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "MovieCards" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}