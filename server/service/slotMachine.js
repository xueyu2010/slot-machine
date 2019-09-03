const {
  User,
  Pull,
  SlotMachine,
  SlotReel,
  Stop,
  Wallet,
  Op
} = require("../sequelize");

getSlot = async () => {
  const slot = await retriveActiveSlotMachine();
  const reels = await retriveReelsByIds(slot.reelIds);

  const stopIds = new Set();
  reels.map(reel => {
    reel.stopIds.map(stopId => stopIds.add(stopId));
  });
  const stops = await retrieveStopsByIds(Array.from(stopIds));
  return assembleSlotData(slot, reels, stops);
};

assembleSlotData = (slot, reels, stops) => {
  let stopDict = {};
  stops.forEach(stop => (stopDict[stop.id] = stop.get({ plain: true })));

  let reelDict = {};
  reels.forEach(reel => (reelDict[reel.id] = reel.get({ plain: true })));

  Object.keys(reelDict).map(reelId => {
    let currentStops = [];
    reelDict[reelId].stopIds.forEach(stopId => {
      const stop = stopDict[stopId];
      currentStops.push(stop);
    });
    reelDict[reelId].stops = currentStops;
  });

  let slotReelDict = {};
  slot.reelIds.forEach(reelId => {
    slotReelDict[reelId] = reelDict[reelId];
  });

  const plainSlot = slot.get({ plain: true });
  plainSlot.reels = Object.values(slotReelDict);

  return plainSlot;
};

pullSlotMachine = async (slotId, bet, uniqueIdentifier, rnd) => {
  let result = {};
  let winners = {};

  // Pull
  const slot = await getSlotById(slotId);
  const payoutTable = slot.payout;

  const reels = await retriveReelsByIds(slot.reelIds);
  // {reelid:xx, { stopId:xx, stopType: xx}}
  const stopIdMatches = {};
  reels.map(reel => {
    const idx = Math.floor(generateRandom(reel.stopIds.length));
    stopIdMatches[reel.id] = reel.stopIds[idx];
  });

  const stops = await retrieveStopsByIds(Object.values(stopIdMatches));
  const stopIdToType = {};

  stops.map((stop, i) => (stopIdToType[stop.id] = stop.stopType));

  const reelMatches = {};

  Object.keys(stopIdMatches).map(reelId => {
    const stopId = stopIdMatches[reelId];

    reelMatches[reelId] = { stopId: stopId, stopType: stopIdToType[stopId] };
  });

  // determine the WINNER or LOSER
  const matchStopTypes = Object.values(reelMatches).map(
    (winner, i) => winner.stopType
  );

  result.matches = reelMatches;

  const winner = slot.payout.filter(
    p => p.stopType.join(",") === matchStopTypes.join(",")
  );
  let payoutAmount = 0;
  if (winner.length > 0) {
    // start payout process
    payoutAmount = winner[0].payout * bet;

    result.won = true;
  } else {
    // opps! losers
    result.won = false;
  }


  const user = await User.findOne({
    where: { uniqueIdentifier }
  });
  const updateAmount = payoutAmount - bet;
  const updatedWallet = await updateWalletBalance(
    user.id,
    updateAmount,
    payoutAmount
  );
  result.payout = { bet, payoutAmount };
  result.wallet = updatedWallet.get({ plain: true });
  return result;
};

calculatePayout = (betAmount, payoutTable, winnerStopIds) => {
  let payoutAmount = 0;
  // Assumption: assume there is only one match payout config
  for (var i = 0; i < payoutTable.length; i++) {
    const payoutX = payoutTable[i].payout;
    if (payoutTable[i].stopIds.join() === winnerStopIds.join()) {
      // congrats, the pull match the payout configure
      payoutAmount = betAmount * payoutX;
    }
  }
  return payoutAmount;
};

updateWalletBalance = async (userId, updateAmount, payoutAmount) => {
  const wallet = await Wallet.findOne({ where: { userId } });
  if (wallet) {
    return wallet.update({
      balance: wallet.balance + updateAmount,
      paid: wallet.paid + payoutAmount
    });
  } else {
    console.log("Critical Error, Wallet for user not found:", userId);
    return wallet;
  }
};

pickStop = async reelId => {
  const reel = await retriveReelsByIds([reelId]);
  const stopIds = reel[0].stopIds;
  // randome generate returns { 0 - 0.99999 } * stop_count
  // floor this number to select the index of stopIds
  const winnerIdx = Math.floor(generateRandom(stopIds.length));
  return stopIds[winnerIdx];
};

generateRandom = total => {
  return Math.random() * total;
};

retriveActiveSlotMachine = () => {
  return SlotMachine.findOne({
    where: { status: "active" }
  });
};

retriveReelsByIds = ids => {
  return SlotReel.findAll({
    where: { id: { [Op.in]: ids } }
  });
};

retrieveStopsByIds = ids => {
  return Stop.findAll({
    where: { id: { [Op.in]: ids } }
  });
};

getSlotById = slotId => {
  return SlotMachine.findOne({
    where: { id: slotId }
  });
};

module.exports = {
  getSlot,
  pullSlotMachine
};
