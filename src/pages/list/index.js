import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Modal, Select, Button } from "antd";
import { connect } from "react-redux";

import Detail from "../detail";

import { accountTableColumns } from "../../config/listConfig";
import { fetchAccountList, fetchAccountDetail } from "../../actions/account";

import styles from "./index.module.css";

const { Option } = Select;
const mapStateToProps = ({ account }) => {
  const {
    error,
    loading,
    accountList,
    errorMessage,
    activeAccountId,
    activeAccountDetail,
  } = account;

  return {
    error,
    loading,
    accountList,
    errorMessage,
    activeAccountId,
    activeAccountDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountList: () => {
      dispatch(fetchAccountList());
    },
    fetchAccountDetail: (id) => {
      dispatch(fetchAccountDetail(id));
    },
  };
};

class ListHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.fetchAccountList();
  }

  handleAccountChange = (value) => {
    this.props.fetchAccountDetail(value);
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState(
      {
        modalVisible: false,
      },
      () => {
        const { fetchAccountDetail, activeAccountId } = this.props;

        fetchAccountDetail(activeAccountId);
      }
    );
  };

  renderTransferModal() {
    const { accountList, activeAccountDetail, activeAccountId } = this.props;
    const { modalVisible } = this.state;

    return (
      <Modal
        footer={null}
        width={700}
        destroyOnClose
        title="Transfer"
        closable={false}
        visible={modalVisible}
      >
        <Detail
          accountList={accountList}
          activeAccountId={activeAccountId}
          activeAccountDetail={activeAccountDetail}
          onCancel={this.handleCancel}
        />
      </Modal>
    );
  }

  renderHintText() {
    const { activeAccountId, activeAccountDetail } = this.props;

    if (!activeAccountId && activeAccountId !== 0) {
      return (
        <span className={styles.hintText}>
          (please select an account firstly...)
        </span>
      );
    }

    let currency = activeAccountDetail ? activeAccountDetail.currency : "$";
    let balance = activeAccountDetail
      ? activeAccountDetail.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 0;

    return (
      <span className={styles.hintText}>
        Current Balance: {currency} {balance}
      </span>
    );
  }

  renderAccountTable = () => {
    const { loading, activeAccountDetail } = this.props;
    const transactionDataSource =
      activeAccountDetail && activeAccountDetail.transactions
        ? activeAccountDetail.transactions
        : [];

    return (
      <Table
        bordered
        size="small"
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={accountTableColumns}
        dataSource={transactionDataSource}
      />
    );
  };

  render() {
    const { loading, accountList, activeAccountId } = this.props;

    return (
      <div>
        <div className={styles.accountContainer}>
          <div className={styles.accountList}>
            <span className={styles.sectionTitle}>Accounts:</span>
            <Select
              loading={loading}
              defaultValue={activeAccountId}
              className={styles.accountDropDown}
              onChange={this.handleAccountChange}
            >
              {accountList.map(({ id, accountNo }) => (
                <Option key={id} value={id}>
                  {accountNo}
                </Option>
              ))}
            </Select>
            {this.renderHintText()}
          </div>
          <Button
            type="primary"
            onClick={this.openModal}
            disabled={activeAccountId === undefined || loading}
          >
            Transfer
          </Button>
        </div>
        {this.renderAccountTable()}
        {this.renderTransferModal()}
      </div>
    );
  }
}

ListHome.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  accountList: PropTypes.array,
  errorMessage: PropTypes.string,
  activeAccountId: PropTypes.number,
  activeAccountDetail: PropTypes.object,
  fetchAccountList: PropTypes.func.isRequired,
  fetchAccountDetail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHome);
