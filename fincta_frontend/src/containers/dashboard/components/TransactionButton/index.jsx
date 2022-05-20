import { StyledContainer, StyledAvatar, StyledPlus } from "./main.styles";

export const TransactionButton = () => {
  return (
    <StyledContainer>
      <StyledAvatar size={50} icon={<StyledPlus />} />
    </StyledContainer>
  );
};
