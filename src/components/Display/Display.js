import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text } from "../../styles";
import { default as AnimeNumber } from "./AnimeNumber";
import { Container, BoxContainer, NumberContainer, InputStyle } from "./style";

class Display extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      credits: [0, 0],
      bet: [0, 0],
      win: [0, 0],
      paid: [0, 0],
      roundComplted: false
    };
  }

  componentDidMount() {
    this.setState({
      credits: [0, this.props.credits],
      bet: [0, this.props.bet],
      win: [0, this.props.win ? this.props.win : 0],
      paid: [0, this.props.paid],
      roundComplted: this.props.roundComplted
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.roundComplted !== nextProps.roundComplted &&
      nextProps.roundComplted
    ) {
      // a new round result came out
      this.setState({
        credits: [this.props.credits, nextProps.credits],
        bet: [this.props.bet, nextProps.bet],
        win: [this.props.win, nextProps.win],
        paid: [this.props.paid, nextProps.paid],
        roundComplted: nextProps.roundComplted
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeNumber = (start, end) => {
    if (start === end) {
      clearInterval(this.time);
    } else {
      this.setState({});
    }
  };
  numberBox = (start, number, header) => {
    return (
      <BoxContainer>
        <Text superBold numberStyle color={"white"}>
          {header}
        </Text>
        <NumberContainer>
          <AnimeNumber start={start} number={number} />
        </NumberContainer>
      </BoxContainer>
    );
  };

  render() {
    const { credits, bet, win, paid } = this.state;
    return (
      <Container>
        {win !== "undefined" && this.numberBox(win[0], win[1], "LAST WIN")}
        {paid !== "undefined" && this.numberBox(paid[0], paid[1], "PAID")}
        {credits !== "undefined" &&
          this.numberBox(credits[0], credits[1], "CREDITS")}
        {bet && this.numberBox(bet[0], bet[1], "BET")}
      </Container>
    );
  }
}

Display.propTypes = {
  win: PropTypes.number.isRequired,
  paid: PropTypes.number.isRequired,
  credits: PropTypes.number.isRequired,
  bet: PropTypes.number.isRequired
};
export default Display;
