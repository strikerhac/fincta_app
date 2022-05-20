import styled from "styled-components";
import { Form } from "antd";

export const StyledFormButtonWrapper = styled(Form.Item)`
  padding: 0.5rem 0 0 0;
`;

export const StyledForm = styled.form`
  text-align: left;
`;

export const StyledFormItem = styled(Form.Item)`
  margin: auto;
  padding: 0.2rem 0 0.2rem 0;
  width: 100%;
  @media (max-width: 450px) {
    width: 100%;
  }
`;
