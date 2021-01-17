import { SHA256 } from 'crypto-js';

type BlockData = {
  amount: number;
} | string;

class Block {
  private index: number;
  private timestamp: string;
  public data: BlockData;
  public previousHash: string;
  public hash: string;

  constructor(index: number, timestamp: string, data: BlockData, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class BlockChain {
  public chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const sainuCoin = new BlockChain();
sainuCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }))
sainuCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }))

console.log('Is blockchain valid? ' + sainuCoin.isChainValid());

sainuCoin.chain[1].data = { amount: 100 };
sainuCoin.chain[1].hash = sainuCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + sainuCoin.isChainValid());

// console.log(JSON.stringify(sainuCoin, null, 4));
