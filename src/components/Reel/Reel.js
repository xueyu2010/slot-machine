import Anime from "react-anime";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { Icons } from "./style";

class Reel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  state = {
    position: 0,
    lastPosition: null
  };
  // define constants for the slot machine
  static iconHeight = 188;
  // TODO: what's the multiplier for?
  multiplier = Math.floor(Math.random() * 4 + 1);
  start = this.setStartPosition();
  speed = Reel.iconHeight * this.multiplier;
  totalStops = this.props.stops.length;

  forceUpdateHandler = () => {
    this.reset();
  };

  reset = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick(false);
    }, 100);
  };

  setStartPosition() {
    return Math.floor(Math.random() * this.totalStops) * Reel.iconHeight * -1;
  }

  // init is just to perf, not real betting
  getSymbolFromPosition = init => {
    let { position } = this.state;
    const { matches, reelId, IdToPosition } = this.props;
    const maxPosition = Reel.iconHeight * (this.totalStops - 1) * -1;
    // calculate how many moves?
    let moved = (this.props.timer / 100) * this.multiplier;
    // retrieve position from backend
    // TODO: there might be a chance that match result didn't return yet, handle this case
    let currentPosition = init
      ? this.setStartPosition()
      : IdToPosition[matches[reelId].stopId] * Reel.iconHeight * -1;
    this.setState({ position: currentPosition, timeRemaining: 0 });

    this.props.onFinish(
      Math.abs((currentPosition / Reel.iconHeight) % this.totalStops),
      init
    );
  };

  moveBackground() {
    const p = this.state.position - this.speed;

    this.setState({
      position: p,
      timeRemaining: this.state.timeRemaining - 100
    });
  }

  tick(init) {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      // the spinning is over, land on the positon
      this.getSymbolFromPosition(init);
    } else {
      // keep spinning
      this.moveBackground();
    }
  }
  // let animeProps = {
  //   opacity: [0, 1],
  //   translateY: [-64, 0],
  //   delay: (el, i) => i * 200
  // };
  // <Anime {...animeProps} key={this.props.id + Date.now()}>
  //   {stops.map((v, i) => (
  //     <div key={i + Date.now()}> {v.name}</div>
  //   ))}
  // </Anime>
  componentDidMount() {
    clearInterval(this.timer);
    const startPosition = this.setStartPosition();

    this.setState({
      position: startPosition,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick(true);
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let { position } = this.state;
    return <Icons style={{ backgroundPosition: "0px " + position + "px" }} />;
  }
}

Reel.propTypes = {
  stops: PropTypes.array
};
export default Reel;
