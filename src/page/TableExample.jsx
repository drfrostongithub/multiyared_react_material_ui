import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

{
  /* <TableHead>
        <TableRow>
          {columns.map((column, i) => (
            <StyledTableCell key={i} align={column.align}>
              {column.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <StyledTableRow
                key={row["Kode Acc"]}
                hover
                role='checkbox'
                tabIndex={-1}
              >
                <StyledTableCell>{row["Kode Acc"]}</StyledTableCell>
                <StyledTableCell>{row["Nama Acc"]}</StyledTableCell>
                <StyledTableCell>{row["Acc Type"]}</StyledTableCell>
                <StyledTableCell>{row["Level"]}</StyledTableCell>
                <StyledTableCell>{row["Parent Acc"]}</StyledTableCell>
                <StyledTableCell>
                  {groupNameMap[row["Group Name"]]}
                </StyledTableCell>
                <StyledTableCell>
                  {controlAccMap[row["Control Acc"]]}
                </StyledTableCell>
                <StyledTableCell>{row["Ccy"]}</StyledTableCell>
                <StyledTableCell>{row["Dept"] ? "Y" : ""}</StyledTableCell>
                <StyledTableCell>{row["Gain loss"] ? "Y" : ""}</StyledTableCell>
                <StyledTableCell align='right'>
                  <button onClick={() => handleOpenDialog("edit", row)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(row)}>Delete</button>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
      </TableBody> */
}
