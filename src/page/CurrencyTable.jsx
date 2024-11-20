import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogEditCurrency from "../components/dialogEditCurrency";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CurrencyModal = ({
  dialogOpenTableCurrency,
  handleCloseTableCurrency,
  handleDelete,
  currencies: initialCurrency,
  // For the Edit Currency
  dialogOpenEditCurrency,
  handleOpenEditCurrency,
  handleCloseEditCurrency,
  submitCurrencyEdit,
  statusEditCurrency,
}) => {
  const [currenciesState, setCurrenciesState] = useState([]);
  const [singularCurrency, setEditCurreny] = useState();
  useEffect(() => {
    if (initialCurrency) {
      setCurrenciesState(initialCurrency);
    } else {
      console.error("Error Currency");
    }
  }, [initialCurrency]);

  const editCurrency = (statusEditCurrency, row) => {
    handleOpenEditCurrency(statusEditCurrency, row);
    setEditCurreny(row);
  };

  return (
    <>
      <Modal
        open={dialogOpenTableCurrency}
        onClose={handleCloseTableCurrency}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='currency table'>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Standard</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currenciesState.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.std ? "Yes" : "No"}</TableCell>
                    <TableCell align='right'>
                      <IconButton onClick={() => editCurrency("edit", row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.code)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant='contained'
            color='primary'
            onClick={() => editCurrency("create")}
          >
            Add New
          </Button>
          <DialogEditCurrency
            dialogOpenEditCurrency={dialogOpenEditCurrency}
            handleCloseEditCurrency={handleCloseEditCurrency}
            submitCurrencyEdit={submitCurrencyEdit}
            singularCurrency={singularCurrency}
            statusEditCurrency={statusEditCurrency}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CurrencyModal;
