import React from 'react';

import '../styles/header.css'
import logo from'../logo.png';

const Header = () => {
    return (
        <header className="customHeader">
            <img src={logo} alt="logo"/>
        </header>
    );
};

export default Header;