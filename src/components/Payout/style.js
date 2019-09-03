import styled from "styled-components";

export const PayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  height: auto;

  transform: translateZ(0);
  &:nth-child(2) {
    margin: 0 10px;
  }
`;

export const PayoutRowContainer = styled.div`
  flex-shrink: 1;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const PayoutItemContainer = styled.div`
  width: 74x;
  height: 94px;
  align-self: center;
  display: flex;
`;

export const Image = styled.img`
  height: 100%;
  object-fit: contain;
`;
