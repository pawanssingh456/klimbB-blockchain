import { Transaction } from './transaction';

export class Block {
  public nonce: number;

  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public timestamp: number = Date.now()
  ) {
    // Generate a random nonce value between 0 and 999999999
    this.nonce = Math.round(Math.random() * 999999999);
  }

  /**
   * Generates a simple hash for the block data.
   * In a real blockchain, a more secure method would be used.
   * @returns {string} The hash of the block.
   */
  get hash(): string {
    const str = JSON.stringify(this);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash.toString();
  }
}
