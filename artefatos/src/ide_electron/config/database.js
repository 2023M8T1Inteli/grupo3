// Import the Sequelize module
const Sequelize = require('sequelize');

// Create an instance of Sequelize configured to use SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database',
});

// Asynchronous function to test the database connection
async function testConnection() {
  try {
    // Attempt to authenticate the connection to the database
    await sequelize.authenticate();

    // If authentication is successful, print a success message
    console.log('Connection established successfully.');
  } catch (error) {
    // If an error occurs during authentication, print an error message
    console.error('Error connecting:', error);
  }
}

// Call the function to test the connection when the module is loaded
testConnection();

// Export the Sequelize instance and the test connection function for use in other modules
module.exports = { sequelize, testConnection };