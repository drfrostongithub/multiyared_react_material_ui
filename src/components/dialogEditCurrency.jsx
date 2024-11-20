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
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.std}
                onChange={(e) =>
                  setFormData({ ...formData, std: e.target.checked })
                }
              />
            }
            label='Standard Currency'
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
              onClick={() =>
                submitCurrencyEdit(initiatlStatusCurrency, formData)
              }
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
