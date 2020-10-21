import FieldTypes from "./fieldTypes";

export const TransferFormFields = (accountOptions) => [
  {
    title: "To",
    dataIndex: "to",
    editable: true,
    required: true,
    fieldType: FieldTypes.DROPDOWN,
    options: accountOptions,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    editable: true,
    required: true,
    fieldType: FieldTypes.NUMBERINPUT,
    decimal: 2,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    editable: true,
    required: true,
    fieldType: FieldTypes.DROPDOWN,
    options: [{ value: "HKD", label: "HKD" }],
  },
];
