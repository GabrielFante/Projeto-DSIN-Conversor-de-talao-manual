import { useState } from "react";
import { View, Image, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Input from "../src/components/Input";
import PasswordInput from "../src/components/PasswordInput";
import { login } from "../src/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await login(email, senha);
      if (result.success) {
        router.replace("/dashboard"); // navega para dashboard
      } else {
        Alert.alert("Erro", result.message || "Email ou senha incorretos");
      }
    } catch (error) {
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Logo.png")} style={styles.logo} resizeMode="contain" />
      <View style={styles.form}>
        <Input label="E-mail" value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" />
        <PasswordInput label="Senha" value={senha} onChangeText={setSenha} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f8" },
  logo: { width: 180, height: 80, marginBottom: 30 },
  form: { width: "80%" },
  button: {
    backgroundColor: "#0057b7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});