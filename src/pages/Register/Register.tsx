import { useState } from "react";
import { signUp, confirmSignUp, signIn } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import "../Login/Login.scss";

export const Register = () => {
  const [step, setStep] = useState<"register" | "confirm">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      console.log("Sign up result:", result);

      // En la mayoría de flujos con Cognito + email, toca confirmar con código.
      setStep("confirm");
      alert("Te enviamos un código de verificación al correo.");
    } catch (error: any) {
      console.error("Register error:", error);
      alert(error?.message || "Error al registrarte");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode,
      });

      console.log("Confirm sign up result:", result);

      // Opcional: iniciar sesión automáticamente después de confirmar
      await signIn({
        username: email,
        password,
      });

      navigate("/admin");
    } catch (error: any) {
      console.error("Confirm error:", error);
      alert(error?.message || "Error al confirmar el registro");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "confirm") {
    return (
      <div className="login-container">
        <h2>Confirmar cuenta</h2>

        <form onSubmit={handleConfirm}>
          <input
            type="text"
            placeholder="Código de verificación"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Confirmando..." : "Confirmar cuenta"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>Crear cuenta</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};