/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Select, Input, InputNumber } from "antd";

import FieldType from "../../config/fieldTypes";

const { Option } = Select;

class InputWrapper extends Component {
  render() {
    const { config, ...restProps } = this.props;

    const { title, fieldType, options, decimal } = config;

    switch (fieldType) {
      case FieldType.DROPDOWN:
        return (
          <Select
            showSearch
            placeholder={`Please select ${title}...`}
            optionFilterProp="children"
            autoFocus
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            spellCheck={false}
            {...restProps}
          >
            {options.map(({ value: optionValue, label }, optionIndex) => (
              <Option key={optionIndex} value={optionValue}>
                {label}
              </Option>
            ))}
          </Select>
        );
      case FieldType.NUMBERINPUT:
        return (
          <InputNumber
            placeholder={`Please input ${title}...`}
            autoFocus
            precision={decimal || null}
            style={{ width: "100%" }}
            {...restProps}
          />
        );

      default:
        return <Input {...restProps} />;
    }
  }
}

export default InputWrapper;
