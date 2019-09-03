import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CBColors, { ButtonColors } from "../theme/CBColor";

const ButtonContainer = styled.button`
  height: ${props => (props.simple ? "2.5em" : "5em")};
  width: 50em;
  margin-left: ${props => (props.horizontalMargin ? 16 : 0)};
  margin-right: ${props => (props.horizontalMargin ? 16 : 0)};
  justify-content: center;
  align-items: center;
  border-radius: ${props => (props.rounded ? 25 : 3)};
  background-color: ${props => {
    if (props.simple) {
      return "transparent";
    }
    if (props.disabled) {
      return props.disabledColor
        ? props.disabledColor
        : ButtonColors.disabledGray;
    }
    if (props.bgColor) {
      return props.bgColor;
    }
    return ButtonColors.blue;
  }};
`;

// const LinearGradientBackground = styled(LinearGradient)`
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   position: absolute;
//   border-radius: ${props => (props.rounded ? 25 : 3)};
// `;

const ButtonText = styled.div`
  color: ${props => {
    if (props.disabled) {
      return CBColors.grayLight;
    }
    if (props.textColor) {
      return props.textColor;
    }
    if (props.simple) {
      return ButtonColors.blue;
    }
    return ButtonColors.white;
  }};
  font-size: 3em;
`;

function Button({
  text,
  simple,
  bgColor,
  textStyle,
  textColor,
  disabled,
  rounded,
  horizontalMargin,
  children,

  ...rest
}) {
  return (
    <ButtonContainer
      simple={simple}
      rounded={rounded}
      disabled={disabled}
      horizontalMargin={horizontalMargin}
      {...rest}
    >
      {children}
      {!children && (
        <ButtonText
          style={textStyle}
          textColor={textColor}
          disabled={disabled}
          simple={simple}
        >
          {text}
        </ButtonText>
      )}
    </ButtonContainer>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  simple: PropTypes.bool,
  textStyle: PropTypes.object,
  bgColor: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,

  horizontalMargin: PropTypes.bool
};

Button.defaultProps = {
  text: "",
  simple: false,
  textStyle: {},
  rounded: false,
  disabled: false,

  horizontalMargin: true
};

export default Button;
