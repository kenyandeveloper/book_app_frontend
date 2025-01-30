import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    // Check if the user is authenticated on page load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/check-auth", {
                    credentials: "include", // Include session cookie
                });
                const data = await response.json();

                if (response.ok && data.authenticated) {
                    setUser(data.user);  // Set logged-in user
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Finish loading
            }
        };

        checkAuth();
    }, []);
    
    // Signup function
    const signup = async (username, email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
                credentials: "include", // Ensure session cookie is stored
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                throw new Error(data.error || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };


    // Login function
    const login = async (username, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // Include session cookie
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                throw new Error(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await fetch("http://127.0.0.1:5000/logout", {
                method: "POST",
                credentials: "include", // Include session cookie
            });

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated,signup, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
