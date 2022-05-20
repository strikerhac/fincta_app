import styled from "styled-components";
import { Avatar } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const StyledContainer = styled.div`
  width: 10%;
`;

export const StyledAvatar = styled(Avatar)`
  background-color: orange;
  margin: auto;
`;

export const StyledPlus = styled(PlusCircleOutlined)`
  color: white;
  font-size: 50px;
`;
