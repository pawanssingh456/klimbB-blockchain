/**
 * Transaction represents a transfer of value from one address to another.
 * In this simplified scenario, a transaction has a single recipient.
 */
export class Transaction {
  /**
   * Creates a new transaction.
   * @param fromAddress The address of the sender. Use `null` for a coinbase transaction (mining reward).
   * @param toAddress The address of the recipient.
   * @param amount The amount to be transferred in the transaction.
   * @throws {Error} Throws an error if the `toAddress` is not a valid string or if the `amount` is not a positive number.
   */
  constructor(
    public fromAddress: string | null,
    public toAddress: string,
    public amount: number
  ) {}
}
