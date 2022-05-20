import React, { useState, useContext } from "react";
import { Modal, Button, Input, Select } from "antd";
import { ModalContext } from "../../App";

function Index(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const [calType, setCalType] = useState("build");
  const [loading, setLoading] = useState(false);
  const { visible, setVisible } = useContext(ModalContext);

  const showModal = () => {
    setVisible(true);
  };

  const handleChange = (value) => {
    setCalType(value);
    console.log(value);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        style={{ zIndex: "999999" }}
        visible={visible}
        title="Feedback"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Ask a question
          </Button>,
        ]}
      >
        <Input placeholder="Your Name" />
        <br />
        <br />
        <Select
          defaultValue="Region"
          style={{
            color: "#d3d3d3",
            width: "100%",
            borderRadius: "0px",
            border: "1px solid #DCDCDC",
          }}
          onChange={handleChange}
        >
          <Option style={{ border: "white" }} value="build">
            Build or Buy
          </Option>
          <Option style={{ border: "white" }} value="acquisition">
            Customer Acquisition Cost
          </Option>
          <Option style={{ border: "white" }} value="recovery">
            CAC Recovery Time
          </Option>
          <Option style={{ border: "white" }} value="impression">
            Cost per Impression
          </Option>
          <Option style={{ border: "white" }} value="equity">
            Equity Capital
          </Option>
        </Select>
        <br />
        <br />
        <TextArea rows={4} />
      </Modal>
    </>
  );
}

export default Index;
