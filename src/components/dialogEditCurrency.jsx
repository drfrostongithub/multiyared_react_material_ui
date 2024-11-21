import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DialogEditCurrency = ({
  dialogOpenEditCurrency,
  handleCloseEditCurrency,
  submitCurrencyEdit,
  singularCurrency: initialCurrencyData,
  statusEditCurrency: initiatlStatusCurrency,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    rate: "",
    std: false,
  });
  const [errors, setErrors] = useState({
    code: "",
    name: "",
    rate: "",
    std: false,
  });

  useEffect(() => {
    if (initiatlStatusCurrency === "edit" && initialCurrencyData) {
      setFormData(initialCurrencyData);
    } else {
      formCleaning();
    }
  }, [initialCurrencyData, initiatlStatusCurrency]);

  const formCleaning = () => {
    setFormData({
      code: "",
      name: "",
      rate: "",
      std: false,
    });
  };

  const handleSubmit = (initiatlStatusCurrency, formData) => {
    const newErrors = Object.assign({}, errors); // Create a copy to avoid mutation
    let hasErrors = false;
    ["code", "name", "rate"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
        hasErrors = true;
      } else {
        newErrors[field] = "";
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      submitCurrencyEdit(initiatlStatusCurrency, formData);
    }
  };

  return (
    <>
      <Modal
        open={dialogOpenEditCurrency}
        onClose={handleCloseEditCurrency}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 200 }}>
          <h3>
            {initiatlStatusCurrency ? "Create Currency" : "Edit Currency"}
          </h3>
          <TextField
            autoFocus
            required
            margin='dense'
            id='editCcyCode'
            label='Currency Code'
            type='text'
            variant='standard'
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            error={!!errors["code"]}
            helperText={errors["code"]}
          />
          <TextField
            required
            margin='dense'
            id='editNameCcy'
            label='Currency Name'
            type='text'
            variant='standard'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors["name"]}
            helperText={errors["name"]}
          />
          <TextField
            required
            margin='dense'
            id='editRateCcy'
            label='Rate'
            type='number'
            variant='standard'
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            error={!!errors["rate"]}
            helperText={errors["rate"]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.std}
                onChange={(e) =>
                  setFormData({ ...formData, std: e.target.checked })
                }
                error={!!errors["std"]}
                helperText={errors["std"]}
              />
            }
            label='Standard Currency'
            error={!!errors["std"]}
            helperText={errors["std"]}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSubmit(initiatlStatusCurrency, formData)}
            >
              Save
            </Button>
            <Button
              variant='contained'
              onClick={() => handleCloseEditCurrency()}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DialogEditCurrency;
