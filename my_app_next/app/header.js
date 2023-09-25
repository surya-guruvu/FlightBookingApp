'use client'

import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
import { usePathname } from 'next/navigation'

import './header.css'; // Import the CSS file
import Link from 'next/link';



const Header = () => {
//   const { t } = useTranslation();

//   const [isFixed, setIsFixed] = useState(false);

//   const handleScroll = () => {
//     setIsFixed(window.scrollY > 100);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const [loggedIn, setLoggedIn] = useState(false);
  const name = "Ayrus";
  const pathname = usePathname();

  return (
    <>
    <div className='header'>
      <div className="curve-background" />
      <nav className="nav">
        <Link href="/" className={`styled-nav-link ${pathname === '/home' ? 'active' : ''}`}>
          {('Home')}
        </Link>
        <Link href={`/about/${name}`} className={`styled-nav-link ${pathname === '/about' ? 'active' : ''}`}>  {/*here name is to be sent*/}
          {('About')}
        </Link>
        <nav to="/login" className={`styled-nav-link ${pathname === '/login' ? 'active' : ''}`}>
          {('Login')}
        </nav>
        <nav to={"/signUp"} className={`styled-nav-link ${pathname === '/signUp' ? 'active' : ''}`}>
          {('signUp')}
        </nav>
        <nav to="/file-upload" className={`styled-nav-link ${pathname === '/file-upload' ? 'active' : ''}`}>
          {('Upload Files')}
        </nav>
        <nav to={"/files"} className={`styled-nav-link ${pathname === '/files' ? 'active' : ''}`}>
          {('My Files')}
        </nav>
        <nav to="/add-flight" className={`styled-nav-link ${pathname === '/add-flight' ? 'active' : ''}`}>
          {('Add Flight')}
        </nav>
        <nav to={"/my_bookings"} className={`styled-nav-link ${pathname === '/my_bookings' ? 'active' : ''}`}>
          {('My Bookings')}
        </nav>
        <nav to="/remove-flight" className={`styled-nav-link ${pathname === '/remove-flight' ? 'active' : ''}`}>
          {('Cancel Flight')}
        </nav>
        <nav to={"/my_notifications"} className={`styled-nav-link ${pathname === '/my_notifications' ? 'active' : ''}`}>
          {('Notifications')}
        </nav>
      </nav>
    </div>
    <div className='con'></div>
    </>

  );
};

export default Header;
