export { };

declare global {
    type Data = {
        title: string,
        place_of_origin: string,
        artist_display: string,
        inscriptions: string | null,
        date_start: string | number,
        date_end: string | number
    };
    
    type AuthContextType = {
        selectedColumns: Data[];
        setSelectedColumns: (column: Data[]) => void;
        loading: boolean;
        setLoading: (loading: boolean) => void;
        allSelected: boolean;
        setAllSelected: (allSelected: boolean) => void;
        numVal: number;
        setNumVal: (numVal: number) => void;
        selectColumns: () => void;
    };
}
