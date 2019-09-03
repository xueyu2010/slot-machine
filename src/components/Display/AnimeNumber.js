import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text } from "../../styles";
import { InputStyle } from "./style";

class AnimeNumber extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentNum: props.number
    };
  }

  componentDidMount() {
    clearInterval(this.timer);
    this.setState({
      start: this.props.start,
      currentNum: this.props.number
    });
    this.timer = setInterval(() => {
      this.changeNumber(this.props.start, this.props.number);
    }, this.speed);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeNumber = (start, end) => {
    if (this.state.currentNum === this.props.number) {
      clearInterval(this.time);
    } else {
      const { number } = this.props;
      const { currentNum } = this.state;

      this.setState({
        currentNum:
          this.state.currentNum +
          (number - currentNum) / Math.abs(currentNum - number)
      });
    }
  };

  speed = 100;

  render() {
    const { currentNum } = this.state;
    return (
      <Text numberStyle value={currentNum} color={"orange"}>
        {currentNum}
      </Text>
    );
  }
}

AnimeNumber.propTypes = {};
export default AnimeNumber;
