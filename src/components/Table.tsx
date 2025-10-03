import { useContext, useEffect, useRef, useState } from "react";
import { DataTable, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber, type InputNumberValueChangeEvent } from "primereact/inputnumber";
import { AuthContext } from "../context/ColumnContext";
import { ProgressSpinner } from "primereact/progressspinner";
// import { Skeleton } from "primereact/skeleton";
// import type { ToggleButtonChangeEvent } from "primereact/togglebutton";



// proiorities left to be completed 
// 1. Make sure to add all selection work on all pages 
// Done Just Re-Check It
// Problem 1. If one element deselected after selecting all then revisiting doesnot presist deselection
// sol 1 we could check if the first column is checked on particular page and if not then we donot check it  do it at end

// 2. Make sure to implement popup box on all pages 

// 3. Complete Type Checking in all code
// 4. Lazy loading untill data loads fully 

const PopUp = () => {
  const op = useRef<OverlayPanel>(null);
  const { numVal, setNumVal, selectColumns } = useContext(AuthContext);
  const toggleAndSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current?.toggle(e);
    selectColumns();
  }

  return (
    <>
      <OverlayPanel ref={op}>
        <InputNumber value={numVal} onValueChange={(e: InputNumberValueChangeEvent) => setNumVal(Number(e.value))} />
        <div>
          <button style={{ margin: "10px", padding: "5px", cursor: "pointer" }} onClick={(e) => toggleAndSelect(e)}>Submit</button>
        </div>
      </OverlayPanel>
      <button style={{ border: "0px", cursor: "pointer" }} type="button" onClick={(e) => op.current?.toggle(e)}>⬇️</button>
    </>
  );
}

export default function Table() {
  const [columns, setColumns] = useState<Data[]>([]);
  const { selectedColumns, setSelectedColumns, loading, setLoading, allSelected, setAllSelected } = useContext(AuthContext);
  const [first, setFirst] = useState<number>(1);

  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    setLoading(true);
    setFirst(event.first);
    const page: number = event.page + 1;
    const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    const data = await res.json();
    setColumns(data?.data);
    if (allSelected) {
      setSelectedColumns(data?.data);
    }
    setLoading(false);
  };

  const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Data[]>) => {
    setSelectedColumns(e.value);
    if (e.type == "all") {
      setSelectedColumns(e.value);
      setAllSelected(!allSelected);
    } else {
      setSelectedColumns(e.value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://api.artic.edu/api/v1/artworks?page=1");
      const data = await res.json();
      setColumns(data?.data);
      if (allSelected) {
        setSelectedColumns(data?.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <>
        <DataTable<Data[]>
          value={columns}
          selectionMode="multiple"
          onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<Data[]>) => onSelectionChange(e)}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
          loading={loading}
          selection={selectedColumns}
        >
          <Column selectionMode="multiple" header=""></Column>
          <Column header={<PopUp />}></Column>
          <Column field="title" header="Title"></Column>
          <Column field="place_of_origin" header="Place of Origin"></Column>
          <Column field="artist_display" header="Artist Display"></Column>
          <Column field="inscriptions" header="Inscriptions"></Column>
          <Column field="date_start" header="Date Start"></Column>
          <Column field="date_end" header="Date End"></Column>
        </DataTable>
        <Paginator first={first} rows={12} totalRecords={129752} onPageChange={onPageChange} />
      </>
    </div>
  );
}