// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.navbar')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    return (
    <>
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
            <button className="hamburger" onClick={handleMenuToggle}>
                <div className="line1" />
                <div className="line2" />
                <div className="line3" />
            </button>
            <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <li>
                    <Link 
                        to="/" 
                        className={currentPath === '/' ? 'selected' : ''}
                        onClick={() => setMenuOpen(false)}
                    >
                        Nazionale
                    </Link>
                </li>    
                <li>
                    <Link 
                        to="/regionale" 
                        className={currentPath === '/regionale' ? 'selected' : ''}
                        onClick={() => setMenuOpen(false)}
                    >
                        Regionale
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/confronto" 
                        className={currentPath === '/confronto' ? 'selected' : ''}
                        onClick={() => setMenuOpen(false)}
                    >
                        Confronto
                    </Link>
                </li>
            </ul>
            
        </nav>
        <div className="navbar-line"></div>
    </>
    );
}
