export const validateAccountForm = (formData, data) => {
  const newErrors = {};
  let hasErrors = false;

  ["Kode Acc", "Nama Acc", "Acc Type"].forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = "This field is required.";
      hasErrors = true;
    } else {
      newErrors[field] = "";
    }
  });

  // New duplicate check for "Kode Acc"
  if (
    data.some(
      (item) =>
        parseFloat(item["Kode Acc"]) === parseFloat(formData["Kode Acc"])
    )
  ) {
    newErrors["Kode Acc"] = "Kode Acc already exists.";
    hasErrors = true;
  }

  return { errors: newErrors, hasErrors };
};
