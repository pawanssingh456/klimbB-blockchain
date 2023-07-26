import express, { Router, Request, Response } from 'express';
import Blockchain from '../models/blockchain';

const router: Router = express.Router();
const blockchain = Blockchain.getInstance();

/**
 * Get the balance of a given address.
 * @route GET /balance/:address
 * @group Blockchain
 * @param {string} address.path.required - The address for which to retrieve the balance.
 * @returns {object} 200 - The balance of the address.
 * @returns {Error} 400 - Invalid address or other errors.
 */
router.get('/:address', (req: Request, res: Response) => {
  const address = req.params.address;

  try {
    const balance = blockchain.getBalance(address);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
