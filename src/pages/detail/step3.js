import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";

import TransactionSummary from "./transactionSummary";

import styles from "./steps.module.css";

function Step3(props) {
  const {
    toAccountNo,
    transactionData,
    activeAccountNo,
    onCancel,
    onRestart,
  } = props;

  return (
    <Result
      status="success"
      title="Successfully Transfered!"
      extra={[
        <Button key={"step3-transfer-again"} type="primary" onClick={onRestart}>
          Transfer Again
        </Button>,
        <Button
          key={"step3-transfer-close"}
          className={styles.actionButton}
          onClick={onCancel}
        >
          Close
        </Button>,
      ]}
    >
      <TransactionSummary
        toAccountNo={toAccountNo}
        transactionData={transactionData}
        activeAccountNo={activeAccountNo}
      />
    </Result>
  );
}

Step3.propTypes = {
  toAccountNo: PropTypes.string.isRequired,
  transactionData: PropTypes.object.isRequired,
  activeAccountNo: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Step3;
