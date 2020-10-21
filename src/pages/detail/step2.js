import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Alert, Popconfirm } from "antd";

import TransactionSummary from "./transactionSummary";
import { transfer } from "../../actions/transaction";

import styles from "./steps.module.css";

const mapStateToProps = ({ transaction }) => {
  const { error, submitting, errorMessage } = transaction;

  return {
    error,
    submitting,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transfer: (from, to, amount, currency) => {
      dispatch(transfer(from, to, amount, currency));
    },
  };
};

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: props.submitting,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.submitting === state.submitting) {
      return null;
    }

    if (!props.submitting && props.submitting !== state.submitting) {
      if (!props.error) {
        const { to, transactionData } = props;
        props.onNext(to, transactionData);
        return {
          submitting: props.submitting,
        };
      }
    }

    return {
      submitting: props.submitting,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { to, transfer, transactionData, activeAccountId } = this.props;

    transfer(activeAccountId, to, transactionData);
  };

  render() {
    const {
      submitting,
      toAccountNo,
      transactionData,
      activeAccountNo,
      onCancel,
      onPrev,
    } = this.props;

    return (
      <div>
        <Alert
          message="Once submit, the transaction cannot be reverted back."
          type="info"
          showIcon
          closable
        />
        <TransactionSummary
          toAccountNo={toAccountNo}
          transactionData={transactionData}
          activeAccountNo={activeAccountNo}
        />
        <div className={styles.stepAction}>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            loading={submitting}
          >
            Submit
          </Button>
          <Button className={styles.actionButton} onClick={onPrev}>
            Back
          </Button>
          <Popconfirm
            title="Are you sure to close the transaction？"
            okText="Yes"
            cancelText="No"
            onConfirm={onCancel}
          >
            <Button className={styles.actionButton}>Close</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

Step2.propTypes = {
  error: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  to: PropTypes.number.isRequired,
  toAccountNo: PropTypes.string.isRequired,
  transactionData: PropTypes.object.isRequired,
  activeAccountId: PropTypes.number.isRequired,
  activeAccountNo: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  transfer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
