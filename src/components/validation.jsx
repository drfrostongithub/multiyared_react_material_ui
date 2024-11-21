export const currenciesList = [
  { code: "IDR", name: "Indonesian Rupiah", std: true, rate: 1.0 },
  { code: "MYR", name: "Malaysian Ringgit", rate: 2.5 },
  { code: "SGD", name: "Singapura Dollar", rate: 5.0 },
  { code: "YEN", name: "Yen Jepang", rate: 78 },
  { code: "USD", name: "Dollar Amerika", rate: 13.42 },
];

export const validateAccountForm = (formData, data, initialMode) => {
  const newErrors = {};
  let hasErrors = false;

  if (data !== null) {
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
      ) &&
      initialMode === "create"
    ) {
      newErrors["Kode Acc"] = "Kode Acc already exists.";
      hasErrors = true;
    }

    // Validate Parent Acc based on Level
    if (formData.Level > 1 && !formData["Parent Acc"]) {
      newErrors["Parent Acc"] =
        "Parent Acc is required for levels greater than 1.";
      hasErrors = true;
    } else if (
      parseFloat(formData["Parent Acc"]) !== parseFloat(formData.Level - 1) &&
      formData["Acc Type"] !== "G" &&
      formData.Level !== 1
    ) {
      console.log(formData["Acc Type"], formData["Parent Acc"]);
      console.log(formData.Level - 1, formData.Level);

      newErrors["Parent Acc"] =
        "Parent Acc must be equal to General (0) or Level - 1.";
      hasErrors = true;
    } else {
      newErrors["Parent Acc"] = "";
    }
  }

  ["code", "name", "rate"].forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = "This field is required.";
      hasErrors = true;
    } else {
      newErrors[field] = "";
    }
  });

  if (formData["std"] && parseFloat(formData.rate) !== 1) {
    newErrors["std"] = "Rate need to be 1";
    hasErrors = true;
  } else {
    console.log(currenciesList);

    newErrors["std"] = "";
  }
  return { errors: newErrors, hasErrors };
};
