import { Paper } from "@mui/material";
// import { tableCellClasses } from "@mui/material/TableCell";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

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

const paginationModel = { page: 0, pageSize: 10 };

const DataTableColumns = ({ data, handleOpenDialog, handleDelete }) => {
  const [isActionsShown, setIsActionsShown] = useState({});
  const columns = [
    { field: "Kode Acc", headerName: "Kode Acc", minWidth: 170 },
    { field: "Nama Acc", headerName: "Nama Acc", minWidth: 170 },
    {
      field: "Acc Type",
      headerName: "Acc Type",
      minWidth: 170,
      valueGetter: (value) => value,
    },
    {
      field: "Level",
      headerName: "Level",
      minWidth: 170,
    },
    { field: "Parent Acc", headerName: "Parent Acc", minWidth: 170 },
    {
      field: "Group Name",
      headerName: "Group Name",
      minWidth: 170,
      valueGetter: (value) => formatValue(value, groupNameMap),
    },
    {
      field: "Control Acc",
      headerName: "Control Acc",
      minWidth: 170,
      valueGetter: (value) => formatValue(value, controlAccMap),
    },
    { field: "Ccy", headerName: "Ccy", minWidth: 170 },
    {
      field: "Dept",
      headerName: "Dept",
      minWidth: 170,
      valueGetter: (value) => (value ? "Y" : ""),
    },
    {
      field: "Gain loss",
      headerName: "Gain loss",
      minWidth: 170,
      valueGetter: (value) => (value ? "Y" : ""),
    },
    {
      field: "action",
      headerName: "",
      minWidth: 170,
      renderCell: (params) => (
        <div>
          <button
            onClick={() =>
              setIsActionsShown({
                ...isActionsShown,
                [params.row.id]: !isActionsShown[params.row.id],
              })
            }
          >
            {isActionsShown[params.row.id] ? "Hide" : "Actions"}
          </button>
          {isActionsShown[params.row.id] && ( // Conditionally render actions based on toggle state
            <>
              <button
                onClick={() => {
                  handleOpenDialog("edit", params.row);
                  // Hide actions after editing
                  setIsActionsShown({
                    ...isActionsShown,
                    [params.row.id]: false,
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(params.row);
                  // Hide actions after deleting
                  setIsActionsShown({
                    ...isActionsShown,
                    [params.row.id]: false,
                  });
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  // const ActionButton = ({ row, handleOpenDialog, handleDelete }) => (
  //   <>
  //     <button onClick={() => handleOpenDialog("edit", row)}>Edit</button>
  //     <button onClick={() => handleDelete(row)}>Delete</button>
  //   </>
  // );

  const dataWithAction = data.map((row, index) => {
    // Use index or a combination of properties for a unique id
    const id = index + 1; // Example using index + 1
    return {
      ...row,
      id,
    };
  });

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rowHeight={38}
          rows={dataWithAction}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 15, 25]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default DataTableColumns;
