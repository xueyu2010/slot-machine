import styled from "styled-components";
import sprite5 from "./img/sprite5.png";
export const Icons = styled.div`
  display: inline-block;
  flex-grow: 1;
  align-self: center;
  width: 50px;
  height: 564px;
  overflow: hidden;
  background: #fff url(${sprite5}) repeat-y;
  will-change: backgroundPosition;
  transition: 0.6s background-position ease-in-out;
  padding: 0 80px;
  transform: translateZ(0);
  &:nth-child(2) {
    margin: 0 10px;
  }
`;
