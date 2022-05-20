import styled from "styled-components";

export const StyledFormCard = styled.div`
  height: 70%;
  margin: auto;
  width: 70%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  @media (max-width: 500px) {
    width: 85%;
  }
  @media (min-width: 700px) {
    width: 60%;
  }
`;
