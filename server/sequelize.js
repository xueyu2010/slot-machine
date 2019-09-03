const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://gyu:password@127.0.0.1:3306/slot");

const testdata = require("./test_data");
// Users related model
const PullModel = require("./models/pull");
const UserModel = require("./models/user");
const WalletModel = require("./models/wallet");
const RefillModel = require("./models/refill");
const WithdrawModel = require("./models/withdraw");

// slot machine related models
const SlotMachineModel = require("./models/slot_machine");
const SlotReelModel = require("./models/slot_reel");
const StopModel = require("./models/stop");

// Create Data Mobile
const Pull = PullModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Wallet = WalletModel(sequelize, Sequelize);
const Refill = RefillModel(sequelize, Sequelize);
const Withdraw = WithdrawModel(sequelize, Sequelize);

const SlotMachine = SlotMachineModel(sequelize, Sequelize);
const SlotReel = SlotReelModel(sequelize, Sequelize);
const Stop = StopModel(sequelize, Sequelize);

// Define relationships
Pull.belongsTo(User);
Wallet.belongsTo(User);
Refill.belongsTo(Wallet);
Withdraw.belongsTo(Wallet);

// create all table
sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

//======= test data set up, remove before go to production
// const testdata = require("./test_data");
// testdata.setup_testdata();
//======= test data set up, remove before go to production
const Op = Sequelize.Op;
module.exports = {
  User,
  Pull,
  Wallet,
  Refill,
  Withdraw,
  SlotMachine,
  SlotReel,
  Stop,
  Op
};
// export sequelize.connect()
exports.testconnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database", err);
    });
  return sequelize;
};
