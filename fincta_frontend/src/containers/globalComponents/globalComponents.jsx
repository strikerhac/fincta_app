import React, { useState } from "react";
import { UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { Avatar, Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";

export const NavIcons = (props) => {
  const history = useHistory();
  const menu = (
    <Menu style={{ marginTop: "5px" }}>
      <Menu.Item key="0">
        <a
          onClick={(e) => {
            e.preventDefault();
            props.setVisible(true);
          }}
        >
          Add Member
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a
          onClick={() => {
            localStorage.removeItem("fincta_token");
            setTimeout(() => {
              history.push("/");
              window.location.reload();
            }, 0);
          }}
        >
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        padding: "0 1.5% 0 0",
        float: "right",
      }}
    >
      {/* {visibleMemberModal ? (
        <MemberModal
          setVisible={SetVisibleMemberModal}
          visible={visibleMemberModal}
          close={closeModal}
        />
      ) : null} */}
      {/* <Avatar size={25} icon={<DownloadOutlined />} /> */}
      {/* &nbsp; &nbsp; */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar
            style={{
              backgroundColor: "white",
              color: "black",
            }}
            size={25}
            icon={<UserOutlined />}
          />
        </a>
      </Dropdown>
    </div>
  );
};
