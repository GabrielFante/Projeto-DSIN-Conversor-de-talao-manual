export type LoginResult = { success: boolean; message?: string };

export async function login(email: string, senha: string): Promise<LoginResult> {
  await new Promise((r) => setTimeout(r, 350));

  const ok = email.trim() !== "" && senha.trim() !== "";
  return ok
    ? { success: true }
    : { success: false, message: "Email ou senha incorretos" };
}
