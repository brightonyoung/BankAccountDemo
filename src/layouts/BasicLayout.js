import React from "react";
import PropTypes from "prop-types";
import { Layout, Breadcrumb } from "antd";
import { TableOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import logo from "../logo.svg";

const { Content, Footer } = Layout;

function BasicLayout(props) {
  const { children } = props;

  return (
    <Layout className="layout">
      <Header
        logo={logo}
        appName="Demo"
        userName="User"
        menuData={[{ icon: <TableOutlined />, name: "List" }]}
      />
      <Content style={{ padding: "0 30px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ReactJS ©2020 Created by Michael
      </Footer>
    </Layout>
  );
}

BasicLayout.PpopTypes = {
  children: PropTypes.object.isRequired,
};

export default BasicLayout;
