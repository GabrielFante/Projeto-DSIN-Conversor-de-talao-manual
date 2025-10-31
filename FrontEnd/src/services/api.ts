import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.10:5173";
const AUTH_LOGIN_PATH =
  process.env.EXPO_PUBLIC_AUTH_LOGIN_PATH ?? "/auth/login";

export type LoginResult = { success: boolean; message?: string };

type BackendShapeA = {
  token: string;
  user: { id: string; name: string; email: string };
};
type BackendShapeB = {
  accessToken: string;
  expiresInSeconds?: number;
  agent: { id: string; name: string; email: string };
};

export async function login(
  email: string,
  senha: string
): Promise<LoginResult> {
  try {
    const response = await fetch(`${API_URL}${AUTH_LOGIN_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    if (response.status === 401 || response.status === 400) {
      const err = await safeJson(response);
      const msg = err?.message ?? "Email ou senha incorretos";
      return { success: false, message: msg };
    }

    if (!response.ok) {
      const err = await safeJson(response);
      return {
        success: false,
        message: err?.message ?? `Erro ${response.status} no login`,
      };
    }

    const data: Partial<BackendShapeA & BackendShapeB> = await response.json();
    const token = data.token ?? data.accessToken;
    const user = data.user ?? data.agent;
    const expS = data.expiresInSeconds ?? null;

    if (!token || !user?.id) {
      return { success: false, message: "Resposta inválida do servidor" };
    }

    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync(
      "me",
      JSON.stringify({ id: user.id, name: user.name, email: user.email })
    );

    if (expS && Number.isFinite(expS)) {
      const expiresAt = Date.now() + expS * 1000;
      await SecureStore.setItemAsync("token_expires_at", String(expiresAt));
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: "Erro de conexão. Verifique sua internet.",
    };
  }
}

async function safeJson(resp: Response) {
  try {
    return await resp.json();
  } catch {
    return null;
  }
}
