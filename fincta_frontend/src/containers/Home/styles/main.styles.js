import styled from "styled-components";
import { Row, Col } from "antd";

export const StyledLoginContainer = styled.div`
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after {
    border-bottom: 2px solid ${(props) => props.theme.colors.primaryText} !important;
  }
  background-color: ${(props) => props.theme.colors.default};
`;

export const StyledContainer = styled.div`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)}rem;
  text-align: left;
`;

export const StyledFormContainer = styled.div`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)}rem;
`;

export const StyledRowContainer = styled.div`
  background-color: ${(props) => props.theme.colors.default};
  height: ${(props) => props.height}vh;
`;

export const StyledRow = styled(Row)`
  background-color: ${(props) => props.theme.colors.default};
  height: 100%;
`;
export const StyledColumn = styled(Col)`
  text-align: center;
  margin: auto;
`;
