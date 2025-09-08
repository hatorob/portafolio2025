import './Navbar.scss';
import { NavLink, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';


export const Navbar = () => {

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <div className="container-navbar">
        <Link to="/">
          <img src="/LOGO.svg" alt=""  width={70} height={70} loading='lazy' />
        </Link>
        <GiHamburgerMenu className='menu' onClick={ () => setOpenMenu(!openMenu) }/>
        <div className="navbar-links-desk">
          <NavLink to='/' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Inicio<span className='decorate'>{` />`}</span></NavLink>
          <NavLink to='/proyectos' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Proyectos<span className='decorate'>{` />`}</span></NavLink>
          <NavLink to='/blogs' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Blogs<span className='decorate'>{` />`}</span></NavLink>
        </div>
      </div>
      <div className={`navbar-links-movil ${openMenu ? "open" : ""}`}>
        <NavLink to='/' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Inicio<span className='decorate'>{` />`}</span></NavLink>
        <NavLink to='/proyectos' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Proyectos<span className='decorate'>{` />`}</span></NavLink>
        <NavLink to='/blogs' className={({isActive}) => isActive ? "active" : ""}><span className='decorate'>{`<`}</span>Blogs<span className='decorate'>{` />`}</span></NavLink>
      </div>
    </>
  )
}
