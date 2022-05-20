import styled from "styled-components";
import { Col, Button } from "antd";

export const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledButton2 = styled(Button)`
  font-size: 11px;
  height: 1.85rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 6px;
  padding: 3px 20px 1px 20px;
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 15px;
  font-weight: bolder;
  float: right;
  border-radius: 10px;
  color: white;
  background-color: orange;
  width: 200px;
  border-color: orange;
  height: 37px;
`;

export const Background = styled.div`
  width: 91.8%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  padding-top: 100px;
  overflow: scroll;
  @media (max-width: 990px) {
    padding-top: 30px;
    padding-bottom: 100px;
  }
  @media (max-width: 770px) {
    width: 83%;
  }
  /* display: flex;
  justify-content: center;
  align-items: center; */
  z-index: 9999;
`;

export const StyledDivider = styled.div`
  height: 97%;
  border-right: 3px solid grey;
  margin-right: 40px;
`;

export const StyledHeadingCol = styled(Col)`
  /* height: 12%; */
  padding: 0;
  text-align: center;
  font-size: clamp(15px, 3vw, 20px);
  font-weight: bolder;
  color: grey;
`;

export const StyledCol = styled(Col)`
  height: 82%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledCard = styled.div`
  padding: 20px;
  width: 100%;
  /* height: 380px; */
  padding-top: 30px;
  padding-bottom: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 10px 10px 0px;
`;
