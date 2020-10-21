import React from "react";
import { Tag } from "antd";
import moment from "moment";

import { ActionTagColorMap } from "./constants";

const displayTextForNumber = (val, decimal = 2) =>
  val.toLocaleString(undefined, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });

const displayTextForDate = (val, format = "YYYY-MM-DD HH:mm:ss") => {
  const dateobj = moment(val);

  if (dateobj.isValid()) {
    return dateobj.format(format);
  }

  return "";
};

const stringSorter = (a, b, dataIndex) => {
  if (a && a[dataIndex]) {
    return a[dataIndex].localeCompare(b ? b[dataIndex] : null);
  }

  return false;
};

export const accountTableColumns = [
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    width: 200,
    sorter: (a, b) => stringSorter(a, b, "timestamp"),
    render: (val) => displayTextForDate(val),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    sorter: (a, b) => stringSorter(a, b, "action"),
    render: (val) => <Tag color={ActionTagColorMap[val]}>{val}</Tag>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 160,
    sorter: (a, b) => a - b,
    render: (val) => displayTextForNumber(val),
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    sorter: (a, b) => stringSorter(a, b, "currency"),
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];
