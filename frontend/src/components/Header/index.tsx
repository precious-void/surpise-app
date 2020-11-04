import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className="Header">
            <div className="Header__container">
                <nav>
                    <Link to="/">Main</Link>
                    <Link to="/statistics">Statistics</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
