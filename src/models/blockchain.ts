import * as fs from 'fs';
import { Transaction } from './transaction';
import { Block } from './block';

/**
 * The Blockchain class represents a simple blockchain data structure.
 */
class Blockchain {
  private static instance: Blockchain;
  public chain: Block[];

  /**
   * Create the initial block for the blockchain.
   */ 
  private createGenesisBlock(): Block {
    return new Block('', new Transaction(null, '', 0));
  }

  /**
   * Get the latest block in the chain.
   */
  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Private constructor to create the singleton instance of the Blockchain class.
   */
  private constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  /**
   * Get the singleton instance of the Blockchain class.
   */
  public static getInstance(): Blockchain {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain();
    }
    return Blockchain.instance;
  }

  /**
   * Function to save the blockchain data to a file.
   * @returns {boolean} Returns true if the data was saved successfully, false otherwise.
   */
  public saveDataToFile(): boolean {
    try {
      const data = JSON.stringify(this.chain);
      fs.writeFileSync('./data/blockchain.json', data);
      return true;
    } catch (error) {
      console.error('Error saving blockchain data to file:', error.message);
      return false;
    }
  }

  /**
   * Function to load the blockchain data from a file.
   * @returns {boolean} Returns true if the data was loaded successfully, false otherwise.
   */
  public loadDataFromFile(): boolean {
    try {
      const data = fs.readFileSync('./data/blockchain.json', 'utf8');
      this.chain = JSON.parse(data);
      return true;
    } catch (error) {
      console.error('Error loading blockchain data from file:', error.message);
      // If the file doesn't exist or there's an error reading it,
      // initialize the blockchain with the genesis block.
      this.chain = [this.createGenesisBlock()];
      return false;
    }
  }

  /**
   * Add a new transaction to the blockchain. The transaction is placed in a new block.
   * @param {Transaction} transaction - The transaction to be added to the blockchain.
   */
  public addTransaction(transaction: Transaction) {
    const newBlock = new Block(
      this.latestBlock.hash,
      transaction,
      Date.now()
    );
    this.chain.push(newBlock);
  }

  /**
   * Get the balance of an address by aggregating the amounts in the related transactions.
   * @param {string} address - The address to check the balance for.
   * @returns {number} The balance of the address.
   */
  public getBalance(address: string): number {
    let balance = 0;
    for (const block of this.chain) {
      const { fromAddress, toAddress, amount } = block.transaction;
      if (fromAddress === address) {
        balance -= amount;
      }
      if (toAddress === address) {
        balance += amount;
      }
    }
    return balance;
  }

  /**
   * Get the transaction history of an address.
   * @param {string} address - The address to get the transaction history for.
   * @returns {Transaction[]} An array of transactions associated with the address.
   */
  public getTransactionHistory(address: string): Transaction[] {
    const transactions: Transaction[] = [];
    for (const block of this.chain) {
      const { fromAddress, toAddress } = block.transaction;
      if (fromAddress === address || toAddress === address) {
        transactions.push(block.transaction);
      }
    }
    return transactions;
  }
}

export default Blockchain;
