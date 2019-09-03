import React from "react";
import { connect } from "react-redux";
import { getSlotInfo, pull, getOrCreateUser } from "./service";
import { walletUpdate } from "../../actions/slotActions";
import { bindActionCreators } from "redux";
import { default as ContentView } from "./View";
import { withCookies, Cookies } from "react-cookie";

class Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slot: {},
      mounted: false,
      user: null,
      stopIdcts: {},
      lastPullResult: null,
      payout: null
    };
  }
  componentDidMount() {
    this.getSlot();
    this.getUser();
  }

  getUser = () => {
    const { cookies } = this.props;
    // get or create user, and their wallets
    getOrCreateUser(cookies).subscribe(res => {
      this.setState({ user: res.user });
      this.props.walletUpdate(res.wallet);
      cookies.set("uuid", res.user.uniqueIdentifier, { path: "/" });
    });
    // set the paid parameter
  };

  getSlot = () => {
    getSlotInfo().subscribe(result => {
      const stopIdToName = {};
      result.reels.map(reel => {
        reel.stops.map(stop => {
          stopIdToName[stop.id] = stop.name;
        });
      });
      this.setState({
        ...this.state,
        slot: result,
        stopdicts: stopIdToName
      });
    });
  };

  render() {

    return (
      <ContentView
        slot={this.state.slot}
        stopdicts={this.state.stopdicts}
        lastPullResult={this.state.lastPullResult}
        wallet={this.props.wallet}
        payoutTable={this.state.slot.payout}
        user={this.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { wallet: state.slot.wallet };
};

const mapDispatchToProps = dispatch => {
  return {
    walletUpdate: bindActionCreators(walletUpdate, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(Container));
