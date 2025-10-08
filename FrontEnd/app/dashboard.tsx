import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  const botoes = [
    { titulo: "Talão Eletrônico", img: require("../assets/Phone.png"), rota: "/multar" },
    { titulo: "Registro de Multas", img: require("../assets/BO.png"), rota: "/multas" },
    { titulo: "Recolhimento", img: require("../assets/NoParking.png"), rota: "/recolhimento" },
    { titulo: "Infraestrutura", img: require("../assets/Infra.png"), rota: "/infraestrutura" },
    { titulo: "Transporte", img: require("../assets/Car.png"), rota: "/transporte" },
    { titulo: "Vaga Especial", img: require("../assets/Cadeira.png"), rota: "/vagaespecial" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Image source={require("../assets/Sair.png")} style={styles.exitLogo} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Botões */}
      <ScrollView contentContainerStyle={styles.botaoContainer}>
        {botoes.map((item, i) => (
          <View key={i} style={styles.botaoETitulo}>
            <TouchableOpacity style={styles.botao} onPress={() => router.push(item.rota)}>
              <Image source={item.img} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.titulo}>{item.titulo}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#0057b7",
    alignItems: "center",
  },
  logo: { width: 120, height: 40 },
  exitLogo: { width: 30, height: 30 },
  botaoContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 16 },
  botaoETitulo: { alignItems: "center", margin: 12, width: 120 },
  botao: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    marginBottom: 8,
  },
  icon: { width: 50, height: 50 },
  titulo: { fontSize: 14, fontWeight: "600", color: "#333", textAlign: "center" },
});