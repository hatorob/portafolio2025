import { useEffect, useState } from "react";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        navigate("/admin");
      } catch {
        // no hay sesión, todo normal
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn({
        username: email,
        password,
      });

      navigate("/admin");
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.name === "UserAlreadyAuthenticatedException") {
        navigate("/admin");
        return;
      }

      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="User o Correo"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};