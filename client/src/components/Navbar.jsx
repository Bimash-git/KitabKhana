import React from 'react';
import Search from './Search';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='nav'>
      <Link to='/' className='site-title'>
        KitabKhana
      </Link>
      <Search />
      <ul>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/contact">Contact Us</CustomLink>
      </ul>
    </div>
  )
}

function CustomLink({to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return(
    <li className={isActive ? "active" : ""}>
      <Link to = {to} {...props}>
        {children}
      </Link>
    </li>
  )
}