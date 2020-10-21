import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Popconfirm } from "antd";

import InputWrapper from "../../components/InputWrapper";
import { TransferFormFields } from "../../config/detailConfig";

import styles from "./steps.module.css";

const { TextArea } = Input;

class Step1 extends Component {
  handleSubmit = (values) => {
    const { onNext } = this.props;

    const { to, ...rest } = values;
    onNext(to, rest);
  };

  render() {
    const { onCancel, transactionData, accountOptions } = this.props;

    const labelCol = {
      xs: { span: 24 },
      sm: { span: 6 },
    };

    const wrapperCol = {
      xs: { span: 24 },
      sm: { span: 16 },
    };

    return (
      <Form
        labelCol={labelCol}
        name="transferForm"
        wrapperCol={wrapperCol}
        onFinish={this.handleSubmit}
        initialValues={transactionData}
      >
        {TransferFormFields(accountOptions).map((item) => {
          const { title, dataIndex, required } = item;

          return (
            <Form.Item
              label={title}
              key={dataIndex}
              name={dataIndex}
              rules={[
                {
                  required: required,
                  message: `Please input ${title}...`,
                },
              ]}
            >
              <InputWrapper config={item} />
            </Form.Item>
          );
        })}
        <Form.Item label={"Description"} name={"description"}>
          <TextArea rows={2} />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Popconfirm
            title="Are you sure to close the transaction？"
            okText="Yes"
            cancelText="No"
            onConfirm={onCancel}
          >
            <Button>Close</Button>
          </Popconfirm>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.actionButton}
          >
            Next
          </Button>
        </div>
      </Form>
    );
  }
}

Step1.propTypes = {
  transactionData: PropTypes.object,
  accountOptions: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Step1;
