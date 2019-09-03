import Anime from "react-anime";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Reel, Display } from "../../components";
import { pull } from "./service";
import { WalletBalance } from "../Wallet";
import { Button } from "../../styles";
import { Container, GradientFade, WinningContainer } from "./style";
import { walletUpdate } from "../../actions/slotActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: null, roundComplted: false, payout: props.payout };
  }

  child = {};
  match = [];
  IdToPosition = {
    1: 8,
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7
  };

  finishHandler = (currentPosition, init) => {
    this.match.push(currentPosition);
    if (this.match.length === 3) {
      setTimeout(() => {
        this.setState({ ...this.state, roundComplted: true });
      }, 1000);
    }
  };

  pullSlotMachine = () => {
    this.setState({ roundComplted: false });
    this.match = [];
    this.setState({ ...this.state, roundComplted: false });

    this.props.reels.map(reel => {
      this.child[reel.id].forceUpdateHandler();
    });
    // call backend to retrieve the positions
    const { slotId, user, reels } = this.props;
    const bet = 1;
    pull(slotId, bet, user.uniqueIdentifier, Math.random()).subscribe(
      result => {
        this.setState({
          won: result.won,
          matches: result.matches,
          payout: result.payout
        });
        this.props.walletUpdate(result.wallet);
      }
    );
  };

  render() {
    const { reels, slotId, wallet } = this.props;
    const { roundComplted, payout } = this.state;
    return (
      <div>
        <Container>
          <div>
            {" "}
            {reels &&
              reels.map(reel => (
                <Reel
                  key={reel.id}
                  reelId={reel.id}
                  onFinish={this.finishHandler}
                  matches={this.state.matches}
                  stops={reel.stops}
                  timer={reel.id * 400 + 1000}
                  IdToPosition={this.IdToPosition}
                  ref={child => {
                    this.child[reel.id] = child;
                  }}
                />
              ))}
          </div>
          {!!payout && !!wallet && (
            <Display
              roundComplted={roundComplted}
              bet={payout.bet}
              win={payout.payoutAmount ? payout.payoutAmount : 0}
              credits={wallet.balance}
              paid={wallet.paid}
              bet={parseInt("1")}
            />
          )}
          <GradientFade />
          <WinningContainer />
        </Container>
        <Button
          text="Spin the reels"
          rounded
          horizontalMargin={true}
          onClick={this.pullSlotMachine}
        />
      </div>
    );
  }
}

Reel.propTypes = {
  reels: PropTypes.array,
  onPull: PropTypes.func
};

const mapStateToProps = state => {
  return {
    wallet: state.slot.wallet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    walletUpdate: bindActionCreators(walletUpdate, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slot);
