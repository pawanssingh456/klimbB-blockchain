/**
 * index.js - Entry point for the Express server.
 * This script initializes the blockchain and starts the server.
 */

// Import the Express app
import app from './app';

// Import the Blockchain singleton class
import Blockchain from '../src/models/blockchain';

// Get the singleton instance of the blockchain
const blockchain = Blockchain.getInstance();

// Load blockchain data from the file system when the server starts
try {
  blockchain.loadDataFromFile();
} catch (error) {
  console.error('Error loading blockchain data:', error.message);
  process.exit(1); // Exit the process with a non-zero code to indicate an error
}

const port = 3000;

// Gracefully shut down the server and save the blockchain data to a file
process.on('SIGINT', () => {
  try {
    blockchain.saveDataToFile();
    console.log('Blockchain data saved to file before shutting down.');
  } catch (error) {
    console.error('Error saving blockchain data:', error.message);
  }

  process.exit(0); // Exit the process with code 0 to indicate successful shutdown
});

process.on('exit', () => {
  // Save data to file when the server exits
  console.log('Server is exiting. Saving data to file.');
  blockchain.saveDataToFile();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
