const bcrypt = require("bcryptjs");

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: false,
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    isAdmin: true,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    isAdmin: false,
  },
];

// Hash passwords for each user
users.forEach((user) => {
  user.password = bcrypt.hashSync("password123", 10); // Synchronously hash the password
});

module.exports = users;
