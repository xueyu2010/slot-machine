const { User, Wallet, Op } = require("../sequelize");
const uuidv4 = require("uuid/v4");

createUser = async data => {
  // if users have a uuid as cookie, and check the DB does have this ID, return
  // or else, generate a new user with new UUId
  let result = {};
  data.uniqueIdentifier = uuidv4();
  data.identifierType = data.identifierType ? data.identifierType : "cookie";
  data.name = data.name ? data.name : "anonymous user";
  const user = await User.create(data);
  // create wallet with 0 WalletBalance
  const walletResult = await Wallet.findOrCreate({
    where: { coin: "BTC", balance: 0, decimal: 0, paid: 0, userId: user.id }
  });
  result.user = user;
  result.wallet = walletResult[0];
  return result;
};

// sometimes, the user cookie has uuid, but was not created in DB,
// therefore, use findorcreate
findUser = async (uniqueIdentifier, identifierType) => {
  let result = {};
  if (!!uniqueIdentifier) {
    let user = null;
    user = await User.findOne({
      where: { uniqueIdentifier, identifierType }
    });
    if (!user) {
      return createUser({});
    } else {
      const wallet = await Wallet.findOne({
        where: { coin: "BTC", userId: user.id }
      });
      result.user = user;
      result.wallet = wallet;
      return result;
    }
  } else {
    return new Promise((resolve, reject) => resolve(result));
  }
};

module.exports = {
  createUser,
  findUser
};
