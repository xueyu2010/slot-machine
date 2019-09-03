import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../styles";
import { WalletBalance } from "../../components/Wallet";
import { Text } from "../../styles";
import { Slot, PayoutTable } from "../../components";

const ContentView = ({
  slot,
  onPull,
  lastPullResult,
  stopdicts,
  wallet,
  payoutTable,
  user
}) => (
  <div style={{ flex: 1, background: "grey" }}>
    <Text bold color={"blue"}>
      Welcome User {!!user && <Text small> {user.uniqueIdentifier}</Text>}
    </Text>
    {slot && payoutTable && (
      <PayoutTable payoutTable={payoutTable} stops={slot.reels[0].stops} />
    )}

    {!!slot && !!slot.reels && (
      <Slot
        slotId={slot.id}
        user={user}
        wallet={wallet}
        reels={slot.reels}
        payout={slot.payout}
        timer="1000"
      />
    )}
  </div>
);

ContentView.propTypes = {
  slot: PropTypes.object,
  onPull: PropTypes.func
};

export default ContentView;
