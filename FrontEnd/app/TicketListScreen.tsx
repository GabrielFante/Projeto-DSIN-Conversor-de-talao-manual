import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COLORS = {
  background: "#F5F7F8",
  card: "#FFFFFF",
  header: "#3D4F5A",
  brand: "#F1B420",
  text: "#2F3C46",
  muted: "#B0B9BF",
  success: "#2ECC71",
  warning: "#F1C40F",
  danger: "#E74C3C",
  lightGray: "#ECECEC",
};

const MOCK_TICKETS = [
  {
    id: "1",
    vehicle: "VW Kombi",
    plate: "LVW-9112",
    reason: "Veículo transitando em velocidade baixa",
    date: "19/05/2025 10:38",
    priority: "Em Análise",
  },
  {
    id: "2",
    vehicle: "Toyota Corolla",
    plate: "QNM-5498",
    reason: "Veículo acima da velocidade",
    date: "19/05/2025 08:27",
    priority: "Em Análise",
  },
  {
    id: "3",
    vehicle: "Audi RS4",
    plate: "JIS-9067",
    reason: "Veículo estacionado em zona azul",
    date: "16/07/2024 15:28",
    priority: "Baixa",
  },
  {
    id: "4",
    vehicle: "Toyota Hilux",
    plate: "YAR-4875",
    reason: "Ultrapassagem no semáforo vermelho",
    date: "15/07/2024 11:45",
    priority: "Alta",
  },
];

export default function TicketListScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredTickets = MOCK_TICKETS.filter(
    (item) =>
      item.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      item.plate.toLowerCase().includes(search.toLowerCase()) ||
      item.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          <Text style={styles.logoText}>DSIN</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={COLORS.text} />
        <TextInput
          style={styles.input}
          placeholder="Buscar placa, datas, veículos..."
          placeholderTextColor={COLORS.muted}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.ticketCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vehicle}>{item.vehicle}</Text>
              <Text style={styles.plate}>{item.plate}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View
              style={[
                styles.status,
                item.priority === "Em Análise"
                  ? { backgroundColor: "#D6EAF8" }
                  : item.priority === "Baixa"
                  ? { backgroundColor: "#E8F8F5" }
                  : item.priority === "Média"
                  ? { backgroundColor: "#FEF5E7" }
                  : { backgroundColor: "#FDEDEC" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.priority === "Em Análise"
                    ? { color: "#2980B9" }
                    : item.priority === "Baixa"
                    ? { color: "#27AE60" }
                    : item.priority === "Média"
                    ? { color: "#F1C40F" }
                    : { color: "#E74C3C" },
                ]}
              >
                {item.priority}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/captureScreen")}
      >
        <MaterialIcons name="camera-alt" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.header,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoText: { color: "#fff", fontSize: 20, fontWeight: "700" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: COLORS.text,
  },

  ticketCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  vehicle: { fontWeight: "bold", color: COLORS.text },
  plate: { color: COLORS.text, fontSize: 12, opacity: 0.8 },
  reason: { fontSize: 13, color: COLORS.text, marginTop: 4 },
  date: { fontSize: 11, color: COLORS.muted, marginTop: 2 },

  status: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.brand,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
