import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Text } from "../../styles";
import { LINE_COLORS } from "../../constants/colors";

const Container = styled.div`
  background-color: white;
  align-items: stretch;
`;

const Content = styled.div`
  height: 53;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  border-bottom-color: ${LINE_COLORS.LINE};
`;

function WalletBalance({ onClick, balance }) {
  return (
    <Container>
      <Content onClick={onClick}>
        <Text color={"blue"} superBold style={{ fontSize: 15, margin: 10 }}>
          Total Satoshi: {balance}
        </Text>
      </Content>
    </Container>
  );
}

WalletBalance.propTypes = {
  onClick: PropTypes.func,
  balance: PropTypes.string.isRequired
};
export default WalletBalance;
