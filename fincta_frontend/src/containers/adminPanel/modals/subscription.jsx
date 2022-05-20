import React, { useState, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { Row, Col, Spin } from "antd";
import {
  StyledButton,
  Background,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "../../transactions/modal/styles/modal.styles";
import {
  CustomInput,
  CustomDatePicker,
} from "../../transactions/modal/components";
import axios, { baseUrl } from "../../../utils/axios";

const Subscription = (props) => {
  const { getSubscriptions } = useContext(DropDownOptionsContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const [periodDuration, setPeriodDuration] = useState(null);
  const [amountPerPeriod, setAmountPerPeriod] = useState(null);
  const [description, setDescription] = useState(null);

  const handleResponse = async () => {
    await getSubscriptions();
    props.setVisibleSecondModal(false);
    props.setVisible(true);
  };

  const handleSubmit = async () => {
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        setLoading(true);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let subscription = {
          name,
          startingDate,
          endingDate,
          periodDuration,
          amountPerPeriod,
          description,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/subscriptions`, subscription)
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
                      <StyledHeadingCol span={24}>
                        Add Subscription
                      </StyledHeadingCol>
                      <br />
                      <br />
                      <StyledCol span={24}>
                        <CustomInput
                          title="Name"
                          value={name}
                          setValue={setName}
                        />
                      </StyledCol>
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomDatePicker
                          title="Start"
                          onChange={(value) => {
                            setStartingDate(value._d);
                          }}
                        />
                        <CustomInput
                          title="Period Duration in months"
                          type="number"
                          min="0"
                          value={periodDuration}
                          setValue={setPeriodDuration}
                        />
                      </StyledCol>
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomDatePicker
                          title="End"
                          onChange={(value) => {
                            setEndingDate(value._d);
                          }}
                        />
                        <CustomInput
                          title="Amount Per Period"
                          type="number"
                          min="0"
                          value={amountPerPeriod}
                          setValue={setAmountPerPeriod}
                        />
                      </StyledCol>
                      <StyledCol span={24}>
                        <CustomInput
                          title="Subscription Description"
                          value={description}
                          setValue={setDescription}
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

export default Subscription;
