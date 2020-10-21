import React, { Component } from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

import styles from "./index.module.css";

const { Step } = Steps;

const steps = [
  {
    title: "Input",
  },
  {
    title: "Confirm",
  },
  {
    title: "Done",
  },
];

class Detail extends Component {
  constructor(props) {
    super(props);

    const { accountList, activeAccountId } = this.props;

    this.state = {
      accountOptions: accountList
        .filter(({ id }) => id !== activeAccountId)
        .map(({ id, accountNo }) => {
          return {
            value: id,
            label: accountNo,
          };
        }),
      activeAccountNo: accountList.find(({ id }) => id === activeAccountId)
        .accountNo,
      currentStep: 0,
      to: undefined,
      toAccountNo: undefined,
      transactionData: undefined,
    };
  }

  onNext = (to, rest) => {
    const { accountOptions } = this.state;

    const currentStep = this.state.currentStep + 1;

    this.setState({
      to,
      toAccountNo: accountOptions.find(({ value }) => value === to).label,
      currentStep,
      transactionData: { to, ...rest },
    });
  };

  onPrev = () => {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  };

  onRestart = () => {
    const currentStep = 0;
    this.setState({ currentStep, to: undefined, transactionData: undefined });
  };

  render() {
    const { activeAccountId, onCancel } = this.props;
    const {
      to,
      toAccountNo,
      accountOptions,
      activeAccountNo,
      transactionData,
      currentStep,
    } = this.state;

    return (
      <>
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles.stepsContent}>
          {currentStep === 0 ? (
            <Step1
              onCancel={onCancel}
              onNext={this.onNext}
              accountOptions={accountOptions}
              transactionData={transactionData}
            />
          ) : currentStep === 1 ? (
            <Step2
              to={to}
              onCancel={onCancel}
              onNext={this.onNext}
              onPrev={this.onPrev}
              toAccountNo={toAccountNo}
              transactionData={transactionData}
              activeAccountId={activeAccountId}
              activeAccountNo={activeAccountNo}
            />
          ) : (
            <Step3
              to={to}
              onCancel={onCancel}
              onRestart={this.onRestart}
              toAccountNo={toAccountNo}
              transactionData={transactionData}
              activeAccountNo={activeAccountNo}
            />
          )}
        </div>
      </>
    );
  }
}

Detail.propTypes = {
  accountList: PropTypes.array.isRequired,
  activeAccountId: PropTypes.number,
  onCancel: PropTypes.func.isRequired,
};

export default Detail;
