import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const formatValue = (value, map) => {
  return map[value] || value; // If value is not found in the map, return the original value
};

const groupNameMap = {
  1: "Assets",
  2: "Liabilitas",
  3: "Capital",
  4: "Revenue",
  5: "COGS",
  6: "Expenses",
  7: "Other Revenue",
  8: "Other Expenses",
};

const controlAccMap = {
  1: "None",
  2: "Cash/Bank",
  3: "Acc Receivable",
  4: "Acc Payable",
  5: "Fixed Asset",
};

const columns = [
  { id: "KodeAcc", label: "Kode Acc", minWidth: 170 },
  { id: "NamaAcc", label: "Nama Acc", minWidth: 170 },
  {
    id: "AccType",
    label: "Acc Type",
    minWidth: 170,
    format: (value) => (value === 1 ? "G" : "D"),
  },
  {
    id: "Level",
    label: "Level",
    minWidth: 170,
  },
  { id: "ParentAcc", label: "Parent Acc", minWidth: 170 },
  {
    id: "GroupName",
    label: "Group Name",
    minWidth: 170,
    format: (value) => formatValue(value, groupNameMap),
  },
  {
    id: "ControlAcc",
    label: "Control Acc",
    minWidth: 170,
    format: (value) => formatValue(value, controlAccMap),
  },
  { id: "Ccy", label: "Ccy", minWidth: 170 },
  {
    id: "Dept",
    label: "Dept",
    minWidth: 170,
    format: (value) => (value === 1 ? "Y" : ""),
  },
  {
    id: "GainLoss",
    label: "Gain loss",
    minWidth: 170,
    format: (value) => (value === 1 ? "Y" : ""),
  },
  { id: "Actions", label: "Actions", minWidth: 170 },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DataTableColumns = ({
  data,
  handleOpenDialog,
  handleDelete,
  rowsPerPage,
  page,
}) => {
  return (
    <>
      <TableHead>
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
      </TableBody>
    </>
  );
};

export default DataTableColumns;
