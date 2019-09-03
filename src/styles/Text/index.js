import styled from "styled-components";
import PropTypes from "prop-types";
import { FontColors } from "../theme/CBColor";

import { createGlobalStyle } from "styled-components";

const Text = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Orbitron");
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");
  font-size: ${props => (props.small ? "0.5em" : "1.5em")};
  color: ${props => props.colorHex || FontColors[props.color]};
  font-family: ${props =>
    props.numberStyle ? "'Orbitron', sans-serif" : "'Open Sans', sans-serif"};

  font-weight: ${props => {
    if (props.bold) {
      return 400;
    }
    if (props.superBold) {
      return 600;
    }
    return 200;
  }};
`;

Text.propTypes = {
  color: PropTypes.oneOf([
    "dark",
    "gray",
    "grayLight",
    "primary",
    "white",
    "red",
    "blue",
    "orange",
    "candyRed"
  ]),
  colorHex: PropTypes.string
};

Text.defaultProps = {
  color: "gray",
  colorHex: undefined
};

export default Text;
