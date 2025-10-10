import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="logout" size={32} />
        </TouchableOpacity>
      </View>

      {/* Botões */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Talao")}
        >
          <MaterialIcons name="phone-android" size={40} color="#0057b7" />
          <Text style={styles.title}>Talão Eletrônico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Multas")}
        >
          <MaterialIcons name="book" size={40} color="#0057b7" />
          <Text style={styles.title}>Registro de Multas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <MaterialCommunityIcons name="parking" size={40} color="#0057b7" />
          <Text style={styles.title}>Recolhimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="build" size={40} color="#0057b7" />
          <Text style={styles.title}>Infraestrutura</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="directions-car" size={40} color="#0057b7" />
          <Text style={styles.title}>Transporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="accessible" size={40} color="#0057b7" />
          <Text style={styles.title}>Vaga Especial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});