import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoxContainer = styled.div`
  background: transparent;
  justify-content: center;
  flex-direction: column;
  margin: 8px;
`;

export const NumberContainer = styled.div`
  background: black;
  border-style: solid;
  border-width: 2px;
  border-color: white;
  min-width: 100px;
  width: 150px;
  padding: 15px;
  display: inline-block;
`;

export const InputStyle = styled.input`
  will-change: value;
  transition: 2s value ease-in-out;
`;
