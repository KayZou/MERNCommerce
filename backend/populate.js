require("dotenv").config();
const colors = require("colors");
const { connection } = require("./db/db");
db = connection();

const Product = require("./models/product.model");
const User = require("./models/users.model");
const Order = require("./models/orders.model");

const jsonProducts = require("./data/Products");
const jsonUsers = require("./data/Users");

const importData = async () => {
  try {
    await db.connectToMongo();

    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(jsonUsers);
    const adminUser = createdUsers[1]._id;

    const sampleProducts = jsonProducts.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await db.connectToMongo();

    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
