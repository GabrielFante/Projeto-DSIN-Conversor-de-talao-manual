import { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";

import TextField from "@/src/components/TextField";
import PasswordField from "@/src/components/PasswordField";
import { AnimatedLogo } from "@/src/components/AnimatedLogo";
import { login } from "@/src/services/api";

const LOGO = require("../assets/dsin/logo.png");

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  // Opacidade do card (entra após a logo terminar)
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const handleLogin = async () => {
    try {
      const result = await login(email, senha);
      if (result.success) {
        router.replace("/dashboard");
      } else {
        Alert.alert("Erro", result.message || "Email ou senha incorretos");
      }
    } catch {
      // remove a variável "error" para não gerar warning de variável não utilizada
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#2F3C46" }]}>
      {/* LOGO: fade-in -> 1.5s -> fade-out; ao terminar, mostra o card */}
      <AnimatedLogo
        source={LOGO}
        width={140}
        height={140}
        fadeInMs={300}
        stayMs={1500}
        fadeOutMs={280}
        onFinish={() => {
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.kav}
      >
        {/* CARD DE LOGIN */}
        <Animated.View style={[styles.form, { opacity: cardOpacity }]}>
          <Image source={LOGO} style={styles.cardLogo} resizeMode="contain" />

          <TextField
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordField
            placeholder="******"
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  kav: { flex: 1, width: "100%", alignItems: "center", justifyContent: "center" },

  form: {
    width: "86%",
    maxWidth: 420,
    backgroundColor: "#3D4F5A",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  cardLogo: { width: 70, height: 70, alignSelf: "center", marginBottom: 8 },

  button: {
    marginTop: 16,
    backgroundColor: "#F1B420",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#2F3C46", fontSize: 16, fontWeight: "bold" },
});
