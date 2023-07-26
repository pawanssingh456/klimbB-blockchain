import express, { Router, Request, Response } from 'express';
import { Transaction } from '../models/transaction'; 
import Blockchain from '../models/blockchain';

const router: Router = express.Router();
const blockchain = Blockchain.getInstance();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions on the blockchain.
 */

/**
 * @swagger
 * path:
 *   /transactions:
 *     post:
 *       summary: Create a new transaction
 *       tags: [Transactions]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 from:
 *                   type: string
 *                 to:
 *                   type: string
 *                 amount:
 *                   type: number
 *               example:
 *                 from: "senderAddress"
 *                 to: "recipientAddress"
 *                 amount: 100
 *       responses:
 *         201:
 *           description: Created successfully. Returns the new transaction.
 *         400:
 *           description: Bad request. Invalid request data.
 */
router.post('/', (req: Request, res: Response) => {
  const { from, to, amount } = req.body as {
    from: string;
    to: string;
    amount: number;
  };

  if (!from || !to || !amount || typeof from !== 'string' || typeof to !== 'string' || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid request data. Make sure to include "from", "to", and "amount" as strings.' });
  }

  try {
    const transaction = new Transaction(from, to, amount);
    blockchain.addTransaction(transaction);
    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * path:
 *   /transactions/{address}:
 *     get:
 *       summary: Get transaction history of an address
 *       tags: [Transactions]
 *       parameters:
 *         - in: path
 *           name: address
 *           required: true
 *           schema:
 *             type: string
 *           description: The address to get the transaction history for.
 *       responses:
 *         200:
 *           description: OK. Returns the transaction history for the given address.
 *         400:
 *           description: Bad request. Invalid address or error getting the transaction history.
 */
router.get('/:address', (req: Request, res: Response) => {
  const { address } = req.params;

  try {
    const transactions = blockchain.getTransactionHistory(address);
    return res.json({ transactions });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
