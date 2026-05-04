import { useAuthSession } from "../../hooks/auth/useAuthSession";
import "./NavbarAdmin.scss";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "aws-amplify/auth";

export const NavbarAdmin = () => {

    const navigate = useNavigate();

    const { user } = useAuthSession();

    const handleLogout = async () => {
        try {
        await signOut();
        navigate("/login");
        } catch (error) {
        console.error("Logout error:", error);
        }
    };

    return ( user &&
        <div className="container-nav-admin">
            <div className="container-header-admin">
                <h3 className="title-admin" onClick={() => navigate("/admin")}>Admin Portafolio</h3>
                <p>User: {user.signInDetails.loginId}</p>
                <hr />
                <div className="container-admin-links">
                    <Link to={"/admin/perfil"}>Perfil</Link>
                    <Link to={"/admin/experiencia"}>Experiencias</Link>
                    <Link to={"/admin/proyectos"}>Proyectos</Link>
                    <Link to={"/admin/blogs"}>Blogs</Link>
                </div>
            </div>
            <button 
                className="btn-close"
                onClick={handleLogout}
            >Salir</button>
        </div>
    )
}
