import Anime from "react-anime";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text } from "../../styles";
import {
  PayoutRowContainer,
  PayoutContainer,
  PayoutImage,
  PayoutItemContainer,
  Image
} from "./style";

class PayoutTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  PayoutRow = (stopNames, payoutAmount, type) => {
    const imageNames = stopNames.map(stopName =>
      require("./img/" + stopName + ".png")
    );
    return (
      <PayoutRowContainer key={stopNames.join(",")}>
        <PayoutItemContainer>
          <Text color={"orange"} style={{ fontSize: 50, margin: "auto" }}>
            {payoutAmount}
          </Text>
        </PayoutItemContainer>
        {imageNames.map(imageName => (
          <PayoutItemContainer key={Math.random()}>
            <Image src={imageName} />
          </PayoutItemContainer>
        ))}
      </PayoutRowContainer>
    );
  };

  stopTypeToNames = stops => {
    let stopMap = {};
    for (var i = 0; i < stops.length; i++) {
      const stopType = stops[i].stopType;
      if (stopMap[stopType]) {
        stopMap[stopType].push(stops[i].name);
      } else {
        let stopNames = [stops[i].name];
        stopMap[stopType] = stopNames;
      }
    }
    return stopMap;
  };

  payoutToStopNames = (payout, stopMap) => {
    // assume the stoptype is the same for all reels
    const macthStopType = payout.stopType[0];
    const payoutCount = payout.stopType.length;
    const matchStopNames = stopMap[macthStopType];
    let result = [];
    // senarios 1: only one matching name, then make the display table as the same with payoutCount
    // senarios 2: else, simply Display
    if (matchStopNames.length === 1) {
      result = [matchStopNames[0], matchStopNames[0], matchStopNames[0]];
    } else {
      result = matchStopNames;
    }
    return result;
  };

  render() {
    const { payoutTable, stops } = this.props;
    const stopMap = this.stopTypeToNames(stops);
    const payoutToStopNames = payoutTable.map(p =>
      this.payoutToStopNames(p, stopMap)
    );

    return (
      <PayoutContainer>
        {payoutTable.map(p =>
          this.PayoutRow(this.payoutToStopNames(p, stopMap), p.payout)
        )}
      </PayoutContainer>
    );
  }
}

PayoutTable.propTypes = {};
export default PayoutTable;
