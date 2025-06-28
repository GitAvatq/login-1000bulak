import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("token");
        
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

    }, [])

    const saveLogin = (userData) => {
        setUser(userData)
        localStorage.setItem("token", JSON.stringify(userData))
    }

    console.log(user);


    return (
        <AuthContext.Provider value={{ saveLogin, user }}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContext;