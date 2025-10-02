export { };

declare global {
    type AuthContextType = {
        selectedColumns:number;
        setSelectedColumns: (column:number) => void;
        loading: boolean;
        setLoading: (loading: boolean) => void;
        allSelected: boolean;
        setAllSelected: (allSelected:boolean) => void;
        numVal: number;
        setNumVal: (numVal: number) => void;
        selectColumns: () => void;
    };
}
