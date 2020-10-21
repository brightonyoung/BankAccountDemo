import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Statistic } from "antd";

function TransactionSummary(props) {
  const { toAccountNo, transactionData, activeAccountNo } = props;
  const { amount, currency, description } = transactionData;

  return (
    <Descriptions column={1} bordered>
      <Descriptions.Item label="From"> {activeAccountNo}</Descriptions.Item>
      <Descriptions.Item label="To">{toAccountNo}</Descriptions.Item>
      <Descriptions.Item label="Amount">
        <Statistic value={amount} suffix={currency} />
      </Descriptions.Item>
      <Descriptions.Item label="Description">{description}</Descriptions.Item>
    </Descriptions>
  );
}

TransactionSummary.propTypes = {
  toAccountNo: PropTypes.string.isRequired,
  transactionData: PropTypes.object.isRequired,
  activeAccountNo: PropTypes.string.isRequired,
};

export default TransactionSummary;
