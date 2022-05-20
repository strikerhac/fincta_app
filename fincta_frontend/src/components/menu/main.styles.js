import styled from "styled-components";
import { Menu } from "antd";
export const StyledMenu = styled(Menu)`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  border: 0;
  background-color: ${(props) => props.theme.colors.default};
  height: 100%;
  padding-top: 8px;
  color: ${(props) => props.theme.colors.primaryText};
`;

export const StyledMenuItem = styled(Menu.Item)`
  font-size: 12px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.primaryText} !important;
  &:hover {
    color: ${(props) => props.theme.colors.primaryText} !important;
  }
`;
