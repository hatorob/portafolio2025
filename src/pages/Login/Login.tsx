import { useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import './Login.scss';
import { AuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { login } = AuthStore();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const userLogin = await apiRequest({
                url: "http://localhost:3000/api/auth/login",
                method: "POST",
                params: {
                    email,
                    password
                }
            });
            if(!userLogin) return;
            login(userLogin);
            navigate("/admin");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form>
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
                <button 
                    type="submit"
                    onClick={ (e) => handleLogin(e) }
                >Ingresar</button>
            </form>
        </div>
    )
}
