import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    return (
        <UserContext.Provider value={{ user, setUser, entries, setEntries, selectedDate, setSelectedDate }}>
            {children}
        </UserContext.Provider>
    );
};
