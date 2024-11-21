import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
  useMediaQuery,
  Paper,
  Select,
  MenuItem,
  FormControlLabel,
  InputLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Draggable from "react-draggable";
import EditIcon from "@mui/icons-material/Edit";
// import DialogEditCurrency from "./dialogEditCurrency";
import CurrencyTable from "../page/CurrencyTable";
import { validateAccountForm } from "./validation";

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const DialogEditAccount = ({
  open,
  mode: initialMode,
  rowData: initialRowData,
  onClose,
  onSubmit,
  data,
}) => {
  const [dialogMode, setDialogMode] = useState(initialMode);
  const [dialogOpenTableCurrency, setOpenTableCurrency] = useState(false);
  const [currencies, setCurrency] = useState([
    { code: "IDR", name: "Indonesian Rupiah", std: true, rate: 1.0 },
    { code: "MYR", name: "Malaysian Ringgit", rate: 2.5 },
    { code: "SGD", name: "Singapura Dollar", rate: 5.0 },
    { code: "YEN", name: "Yen Jepang", rate: 78 },
    { code: "USD", name: "Dollar Amerika", rate: 13.42 },
  ]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    "Kode Acc": "",
    "Nama Acc": "",
    Ccy: "",
    "Group Name": "",
    "Acc Type": "",
    Level: "",
    Dept: false,
    "Gain loss": false,
    "Control Acc": "",
    "Parent Acc": "",
  });
  const [dialogOpenEditCurrency, setOpenEditCurrency] = useState(false);
  const [statusEditCurrency, setStatusEditCurrency] = useState();
  const [selectedRowCurrencies, setSelectedRowCurrencies] = useState(null); // Store the selected row data
  const [errors, setErrors] = useState({
    "Kode Acc": "",
    "Nama Acc": "",
    "Acc Type": "",
  });
  useEffect(() => {
    if (initialMode === "edit" && initialRowData) {
      setFormData(initialRowData);
    } else {
      formCleaning();
      setErrors({ "Kode Acc": "", "Nama Acc": "", "Acc Type": "" });
    }
  }, [initialMode, initialRowData]);

  const handleSubmit = () => {
    const { errors, hasErrors } = validateAccountForm(formData, data);
    setErrors(errors);

    if (!hasErrors) {
      onSubmit(formData);
      formCleaning();
      onClose();
    }
  };

  const closeWhileCleaning = () => {
    formCleaning();
    onClose();
  };

  // Currency Table
  const handleOpenTableCurrency = () => {
    setOpenTableCurrency(true);
  };

  const handleCloseTableCurrency = () => {
    setOpenTableCurrency(false);
  };

  const submitCurrencyEdit = (statusEditCurrency, currencyData) => {
    if (statusEditCurrency === "create") {
      setCurrency([...currencies, currencyData]);
    } else if (statusEditCurrency === "edit") {
      const rowIndex = currencies.findIndex(
        (item) => item === selectedRowCurrencies
      );
      if (rowIndex !== -1) {
        const updatedData = [...currencies];
        updatedData[rowIndex] = currencyData;
        setCurrency(updatedData);
      }
    }

    handleCloseEditCurrency(); // Close the dialog after handling data
  };

  const deleteCurrency = (currencyCode) => {
    const newData = currencies.filter((item) => item.code !== currencyCode);
    setCurrency(newData);
  };

  const formCleaning = () => {
    setFormData({
      "Kode Acc": "",
      "Nama Acc": "",
      Ccy: "",
      "Group Name": "",
      "Acc Type": "",
      Level: "",
      Dept: false,
      "Gain loss": false,
      "Control Acc": "",
      "Parent Acc": "",
    });
  };

  // Edit Currency
  const handleOpenEditCurrency = (statusEditCurrency, row) => {
    setStatusEditCurrency(statusEditCurrency);
    setSelectedRowCurrencies(row);
    setOpenEditCurrency(true);
  };

  const handleCloseEditCurrency = () => {
    setOpenEditCurrency(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle id='draggable-dialog-title' style={{ cursor: "move" }}>
          {initialMode === "create" ? "Create Account" : "Edit Account"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='Kode Acc'
            label='Kode Acc'
            type='text'
            variant='standard'
            value={formData["Kode Acc"] || ""}
            onChange={(e) =>
              setFormData({ ...formData, ["Kode Acc"]: e.target.value })
            }
            error={!!errors["Kode Acc"]}
            helperText={errors["Kode Acc"]}
          />

          <TextField
            autoFocus
            required
            margin='dense'
            id='Nama Acc'
            label='Nama Acc'
            type='text'
            variant='standard'
            value={formData["Nama Acc"] || ""}
            onChange={(e) =>
              setFormData({ ...formData, ["Nama Acc"]: e.target.value })
            }
            error={!!errors["Nama Acc"]}
            helperText={errors["Nama Acc"]}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <InputLabel
                id='demo-simple-select-label'
                error={!!errors["Acc Type"]}
                helperText={errors["Acc Type"]}
                required
              >
                Acc Type
              </InputLabel>
              <Select
                required
                value={formData["Acc Type"] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ["Acc Type"]: e.target.value })
                }
                label='Acc Type'
                sx={{ width: 200 }}
                error={!!errors["Acc Type"]}
                helperText={errors["Acc Type"]}
              >
                <MenuItem key={1} value={"G"}>
                  General
                </MenuItem>
                <MenuItem key={2} value={"D"}>
                  Detail
                </MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id='demo-simple-select-label'>Level</InputLabel>
              <Select
                value={formData.Level || ""}
                onChange={(e) =>
                  setFormData({ ...formData, Level: e.target.value })
                }
                label='Level'
                sx={{ width: 200 }}
              >
                {Array.from({ length: 9 }, (_, i) => i + 1).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <TextField
            autoFocus
            required
            margin='dense'
            id='Parent Acc'
            label='Parent Acc'
            type='text'
            variant='standard'
            value={formData["Parent Acc"] || ""}
            onChange={(e) =>
              setFormData({ ...formData, ["Parent Acc"]: e.target.value })
            }
            // error={!!currencyData.codeError} // Assuming you have an error state for code
            // helperText={currencyData.codeError} // Assuming you have an error message for code
          />
          <InputLabel id='demo-simple-select-label'>Acc Group</InputLabel>
          <Select
            sx={{ width: 200 }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={formData["Group Name"] || ""}
            label='Acc Group'
            onChange={(e) =>
              setFormData({ ...formData, "Group Name": e.target.value })
            }
          >
            <MenuItem value={1}>Asset</MenuItem>
            <MenuItem value={2}>Liabilitas</MenuItem>
            <MenuItem value={3}>Capital</MenuItem>
            <MenuItem value={4}>Revenue</MenuItem>
            <MenuItem value={5}>COGS</MenuItem>
            <MenuItem value={6}>Expenses</MenuItem>
            <MenuItem value={7}>Other Revenue</MenuItem>
            <MenuItem value={8}>Other Expences</MenuItem>
          </Select>
          <div style={{ display: "flex" }}>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Acc Control</InputLabel>
              <Select
                sx={{ width: 200 }}
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={formData["Control Acc"] || ""}
                label='Acc Control'
                autoWidth
                onChange={(e) =>
                  setFormData({ ...formData, "Control Acc": e.target.value })
                }
              >
                <MenuItem value={1}>None</MenuItem>
                <MenuItem value={2}>Cash/Bank</MenuItem>
                <MenuItem value={3}>Acc. Receivable</MenuItem>
                <MenuItem value={4}>Acc. Payable</MenuItem>
                <MenuItem value={5}>Fixed Asset</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
              <Select
                id='standard-select-currency'
                label='Select'
                value={formData["Ccy"] || ""}
                sx={{ width: 200 }}
                onChange={(e) =>
                  setFormData({ ...formData, Ccy: e.target.value })
                }
              >
                {currencies.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.Dept}
                  onChange={(e) =>
                    setFormData({ ...formData, Dept: e.target.checked })
                  }
                />
              }
              label='Department'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData["Gain loss"]}
                  onChange={(e) =>
                    setFormData({ ...formData, "Gain loss": e.target.checked })
                  }
                />
              }
              label='Gain loss'
            />
            <Button
              variant='contained'
              disableRipple
              onClick={handleOpenTableCurrency}
              startIcon={<EditIcon />}
            >
              Edit Currency
            </Button>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          <Button onClick={handleSubmit}>
            {dialogMode === "create" ? "Buat" : "Simpan"}
          </Button>
          <Button onClick={closeWhileCleaning}>Batal</Button>
        </DialogActions>
        <CurrencyTable
          dialogOpenTableCurrency={dialogOpenTableCurrency} // false
          handleCloseTableCurrency={handleCloseTableCurrency}
          handleDelete={deleteCurrency}
          currencies={currencies}
          // For the Edit Currency
          dialogOpenEditCurrency={dialogOpenEditCurrency} // false
          handleOpenEditCurrency={handleOpenEditCurrency}
          handleCloseEditCurrency={handleCloseEditCurrency}
          submitCurrencyEdit={submitCurrencyEdit}
          statusEditCurrency={statusEditCurrency}
        />
      </Dialog>
    </>
  );
};

export default DialogEditAccount;
