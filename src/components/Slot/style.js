import styled from "styled-components";
export const Container = styled.div`
  background-color: black;
  overflow: hidden;
  height: 702px;
  padding: 2em;
  justify-content: center;
  transform: scale(0.82, 0.82);
  display: flex;
  flex-direction: column;
  transition: 0.3s transform;
`;

export const ReelContainer = styled.div`
  height: 53;
  width: 50
  flex-grow: 1;
  align-self: center;
  background-color: white;
`;

export const GradientFade = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  bottom: 32px;
  left: 32px;
  background: linear-gradient(
    to bottom,
    rgba(64, 64, 64, 1) 0%,
    rgba(64, 64, 64, 0) 7%,
    rgba(64, 64, 64, 0) 93%,
    rgba(64, 64, 64, 1) 100%
  );
`;

export const WinningContainer = styled.div`
  position: absolute;
  top: 240px;
  right: 92px;
  bottom: 340px;
  left: 92px;
  background: linear-gradient(
    to bottom,
    rgba(226, 143, 239, 1) 0%,
    rgba(226, 143, 239, 0) 15%,
    rgba(226, 143, 239, 0) 85%,
    rgba(226, 143, 239, 1) 100%
  );
`;
