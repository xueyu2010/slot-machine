const { SlotMachine, SlotReel, Stop, Payout, Wallet } = require("./sequelize");

// Create a test slot SlotMachine
createStops = async (stopNameWithProb, totalStops) => {
  const stopsIds = [];
  for (var stopname in stopNameWithProb) {
    const occurance = stopNameWithProb[stopname][0];
    const type = stopNameWithProb[stopname][1];
    const result = await Stop.findOrCreate({
      where: {
        name: stopname,
        stopType: type,
        probability: occurance
      }
    });
    // calculate how many stops should this be on a reel
    for (var i = 0; i < occurance; i++) {
      stopsIds.push(result[0].id);
    }
  }
  return stopsIds;
};

createReels = (stopIds, reelName) => {
  // find all test type stops, resemble as a reel
  return SlotReel.findOrCreate({
    where: { stopIds: stopIds, name: reelName }
  });
};

createSlot = (slotName, reelIds, payoutJson) => {
  return SlotMachine.findOrCreate({
    where: {
      reelIds: reelIds,
      name: slotName,
      status: "active",
      payout: payoutJson
    }
  });
};

createWalletBalance = (userId, balance, coin) => {
  return Wallet.findOrCreate({
    where: { coin, balance, decimal: 0, userId }
  });
};

setUp = async () => {
  const totalStops = 6;

  // first: probability, second: type
  const stopNameWithProb = {
    cherry: [1, 1],
    hanburger: [1, 3],
    pizza: [1, 3],
    broccoli: [1, 2],
    pineapple: [1, 3],
    banana: [1, 3],
    beer: [1, 3],
    avacado: [1, 2],
    corn: [1, 2]
  };
  // assuming there is 3 reels

  const stopsIds = await createStops(stopNameWithProb, totalStops);
  console.log("=======CREATED STOP for a reel, ids:", stopsIds);

  // create three reels
  const numOfReels = 3;
  const reelIds = [];
  for (var i = 0; i < numOfReels; i++) {
    const reel = await createReels(stopsIds, "fruits" + i.toString());
    reelIds.push(reel[0].id);
  }
  console.log("========CREATED 3 reels with id", reelIds);

  // create SlotMachine

  // TODO:: dont' hardcode it
  const payoutJson = [
    { stopType: [1, 1, 1], payout: 50 },
    { stopType: [2, 2, 2], payout: 15 },
    { stopType: [3, 3, 3], payout: 5 }
  ];
  const slot = await createSlot("Grace Slot Machine", reelIds, payoutJson);
  console.log("========SLOT machine created: ", slot);
};

exports.setup = () => {
  setUp().then(() => {
    console.log("======= Test Data scucessfully set up=======");
  });
};

exports.createWallet = userId => {
  createWalletBalance(userId, 2000000, "BTC").then(wallet => {
    console.log("======= Wallet created:", wallet);
  });
};


exports.test = () => {
  console.log('test------------')
}
