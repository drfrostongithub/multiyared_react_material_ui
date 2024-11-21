import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Table,
  TableContainer,
  // TablePagination,
  Paper,
  Button,
} from "@mui/material";
import DialogEditAccount from "../components/dialogEditAccount";
import DataTableBody from "../components/dataTableBody";
import SearchBar from "../components/searchBar";

const DataTable = () => {
  const [data, setData] = useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog state
  const [dialogMode, setDialogMode] = useState(""); // Manage dialog mode ('edit' or 'create')
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row data

  useEffect(() => {
    fetch("/mock.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Get the text content of the CSV
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Parse the header row
          dynamicTyping: true, // Automatically convert data types
          complete: (results) => {
            setData(results.data); // Set parsed data
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormDataSubmit = (formData) => {
    if (dialogMode === "create") {
      setData([...data, formData]);
    } else if (dialogMode === "edit") {
      const rowIndex = data.findIndex(
        (item) => item["Kode Acc"] === selectedRow["Kode Acc"]
      );
      if (rowIndex !== -1) {
        const updatedData = [...data];
        updatedData[rowIndex] = formData;
        setData(updatedData);
      }
    }

    handleCloseDialog(); // Close the dialog after handling data
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleOpenDialog = (mode, row) => {
    setDialogMode(mode);
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = (rowData) => {
    const newData = data.filter(
      (item) => item["Kode Acc"] !== rowData["Kode Acc"]
    );
    setData(newData);
  };

  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(searchText);
    });
  });

  const handleSearch = (searchTerm) => {
    setSearchText(searchTerm.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant='contained'
          color='success'
          onClick={() => handleOpenDialog("create")}
        >
          Tambah Data
        </Button>
        <SearchBar onSearch={handleSearch} searchText={searchText} />
      </div>
      <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
        <Table
          stickyHeader
          aria-label='sticky table'
          sx={{ minWidth: 650 }}
          size='small'
        >
          <DataTableBody
            data={filteredData}
            handleOpenDialog={handleOpenDialog}
            handleDelete={handleDelete}
          />
        </Table>
      </TableContainer>
      <DialogEditAccount
        open={dialogOpen}
        mode={dialogMode}
        rowData={selectedRow}
        onClose={handleCloseDialog}
        onSubmit={handleFormDataSubmit}
        data={data}
      />
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default DataTable;
