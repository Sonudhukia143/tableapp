import { useState, type JSX, createContext } from 'react';

const defaultValue = {
    selectedColumns: 0,
    setSelectedColumns: () => { },
    loading: false,
    setLoading: () => { },
    allSelected: false,
    setAllSelected: () => { },
    setNumVal: () => { },
    numVal: 0,
    selectColumns: () => { }
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedColumns, setSelectedColumns] = useState<number>(0);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [numVal, setNumVal] = useState<number>(0);

    const selectColumns = async () => {
        const res = await fetch(`https://api.artic.edu/api/v1/artworks?limit=${numVal}`);
        const data = await res.json();
        setSelectedColumns(data?.data);
    }

    const value = {
        selectedColumns,
        setSelectedColumns,
        loading,
        setLoading,
        allSelected,
        setAllSelected,
        numVal,
        setNumVal,
        selectColumns
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };