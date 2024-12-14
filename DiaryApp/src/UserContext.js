import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([])

    return (
        <UserContext.Provider value={{ user, setUser, entries, setEntries }}>
            {children}
        </UserContext.Provider>
    );
};
