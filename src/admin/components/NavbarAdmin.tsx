import { AuthStore } from "../../store/AuthStore";
import "./NavbarAdmin.scss";
import { Link, useNavigate } from 'react-router-dom';

export const NavbarAdmin = () => {

    const { user, logout } = AuthStore();
    const navigate = useNavigate();
    console.log(user);

    return ( user &&
        <div className="container-nav-admin">
            <div className="container-header-admin">
                <h3 className="title-admin" onClick={() => navigate("/admin")}>Admin Portafolio</h3>
                <p>User: {user.user}</p>
                <hr />
                <div className="container-admin-links">
                    <Link to={"/admin/experiencia"}>Experiencias</Link>
                    <Link to={"/admin/proyectos"}>Proyectos</Link>
                    <Link to={"/admin/blogs"}>Blogs</Link>
                </div>
            </div>
            <button 
                className="btn-close"
                onClick={logout}
            >Salir</button>
        </div>
    )
}
