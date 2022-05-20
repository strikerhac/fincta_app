import React, { useState, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { Row, Spin, Col } from "antd";
import {
  StyledButton,
  Background,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "../../transactions/modal/styles/modal.styles";
import {
  CustomInput,
  CustomDropdown,
} from "../../transactions/modal/components";
import axios, { baseUrl } from "../../../utils/axios";

const Asset = (props) => {
  const { getAssets } = useContext(DropDownOptionsContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [usefulLife, setUsefulLife] = useState(null);
  const [description, setDescription] = useState(null);
  const [identificationNumber, setIdentificationNumber] = useState(null);
  const [perishable, setPerishable] = useState(null);
  const [movable, setMovable] = useState(null);
  const [used, setUsed] = useState(null);
  const [purchasingCost, setPurchasingCost] = useState(0);
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState(0);

  const handleResponse = async () => {
    await getAssets();
    props.setVisibleSecondModal(false);
    props.setVisible(true);
  };

  const pNPOptions = [
    { value: "perishable", label: "Perishable" },
    { value: "nonPerishable", label: "Non-Perishable" },
  ];
  const mIMOptions = [
    { value: "movable", label: "Movable" },
    { value: "immovable", label: "Immovable" },
  ];
  const uNOptions = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ];

  const handleSubmit = async () => {
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        setLoading(true);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let asset = {
          name,
          type,
          usefulLife,
          description,
          identificationNumber,
          perishable,
          movable,
          used,
          purchasingCost,
          accumulatedDepreciation,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/assets`, asset)
            .then((res) => {
              console.log(res);
              handleResponse();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            })
        );
        return Promise.all(promises);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleBack = (event) => {
    setLoading(false);
    props.setVisibleSecondModal(false);
    props.setVisible(true);
  };

  return (
    <>
      {props.visibleSecondModal ? (
        <Background>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              xs={{ span: 22 }}
              sm={{ span: 22 }}
              md={{ span: 20 }}
              lg={{ span: 16 }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Spin tip="Loading..." spinning={loading}>
                  <StyledCard>
                    <Row style={{ height: "100%" }}>
                      <StyledHeadingCol span={24}>Add Asset</StyledHeadingCol>
                      <br />
                      <br />
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="Asset Name"
                          value={name}
                          setValue={setName}
                        />
                        <CustomInput
                          title="Asset Type"
                          value={type}
                          setValue={setType}
                        />
                        <CustomInput
                          title="Useful Life in years"
                          type="number"
                          min="0"
                          value={usefulLife}
                          setValue={setUsefulLife}
                        />
                        <CustomInput
                          required={false}
                          title="Asset Description"
                          value={description}
                          setValue={setDescription}
                        />
                      </StyledCol>
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="Identification Number"
                          value={identificationNumber}
                          setValue={setIdentificationNumber}
                        />
                        <CustomDropdown
                          creatable={false}
                          title="Perishable/Non-Perishable"
                          options={pNPOptions}
                          onChange={(value) =>
                            setPerishable(
                              value.value === "perishable" ? true : false
                            )
                          }
                        />
                        <CustomDropdown
                          creatable={false}
                          title="Movable/Immovable"
                          options={mIMOptions}
                          onChange={(value) =>
                            setMovable(value.value === "movable" ? true : false)
                          }
                        />
                        <CustomDropdown
                          creatable={false}
                          title="Used/New"
                          options={uNOptions}
                          onChange={(value) =>
                            setUsed(value.value === "used" ? true : false)
                          }
                        />
                      </StyledCol>
                    </Row>
                  </StyledCard>
                </Spin>
                <br />
                <Row
                  gutter={16}
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Col md={{ span: 6 }} lg={{ span: 4 }}>
                    <StyledButton
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={handleBack}
                    >
                      Back
                    </StyledButton>
                  </Col>
                  <Col
                    xs={{ span: 11 }}
                    sm={{ span: 11 }}
                    md={{ span: 10 }}
                    lg={{ span: 8 }}
                  >
                    <StyledButton
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Add
                    </StyledButton>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Background>
      ) : null}
    </>
  );
};

export default Asset;
