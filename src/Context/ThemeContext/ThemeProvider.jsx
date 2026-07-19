import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Read from localStorage on initial load, default to 'light'
        const savedTheme = localStorage.getItem('agromart-theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        // Apply the theme to the <html> element for DaisyUI
        document.documentElement.setAttribute('data-theme', theme);
        // Persist the choice
        localStorage.setItem('agromart-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
