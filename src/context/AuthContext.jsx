import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { staff } = await import('../db.json');
            const validUser = staff.find(u => u.email === email && u.password === password);
            if (validUser) {
                setUser(validUser);
                localStorage.setItem('user', JSON.stringify(validUser));
                return true;
            } else {
                console.log("No user found for given credentials");
                return false;
            }
        } catch (error) {
            console.error("Failed to login:", error);
            return false;
        }
    };

    const logout = () => {
        console.log("User logged out");
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
