/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./index.module.css";

const { Header } = Layout;

class index extends Component {
  renderMenuItem = (menuData) => {
    if (!menuData || menuData.length === 0) {
      return <Menu.Item key="1">Home</Menu.Item>;
    }

    return menuData.map((menu, key) => {
      const { icon, name } = menu;

      return (
        <Menu.Item key={key}>
          {icon}
          {name}
        </Menu.Item>
      );
    });
  };

  render() {
    const { logo, appName, userName, menuData } = this.props;

    return (
      <Header className={styles.container}>
        <div className={styles.left}>
          <div className="logo">
            <img className={styles.logo} src={logo} alt="logo" />
            <span className={styles.logoText}>{appName}</span>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: "64px" }}
          >
            {this.renderMenuItem(menuData)}
          </Menu>
        </div>
        <div style={{ float: "right" }}>
          <Avatar icon={<UserOutlined />} />
          <span className={styles.userName}>{userName}</span>
        </div>
      </Header>
    );
  }
}

index.propTypes = {
  logo: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  menuData: PropTypes.array.isRequired,
};

export default index;
