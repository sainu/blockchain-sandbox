import { SHA256 } from 'crypto-js';

class Transaction {
  constructor(public fromAddress: string | null, public toAddress: string, public amount: number) {}
}

class Block {
  private timestamp: number;
  public transactions: Transaction[];
  public previousHash: string;
  public hash: string;
  private nonce: number;

  constructor(timestamp: number, transactions: Transaction[], previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty: number) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class BlockChain {
  public chain: Block[];
  private difficulty: number;
  private pendingTransactions: Transaction[];
  private miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  private createGenesisBlock(): Block {
    return new Block(Number(new Date('2017/01/01')), [], "0");
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string) {
    const block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress == address) {
          balance -= trans.amount;
        }

        if (trans.toAddress == address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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
sainuCoin.createTransaction(new Transaction('address1', 'address2', 100));
sainuCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner...');
sainuCoin.minePendingTransactions('sainu-address');

console.log('\nBalance of sainu is ', sainuCoin.getBalanceOfAddress('sainu-address'));

console.log('\n Starting the miner again...');
sainuCoin.minePendingTransactions('sainu-address');

console.log('\nBalance of sainu is ', sainuCoin.getBalanceOfAddress('sainu-address'));
