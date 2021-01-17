import { Injectable } from '@angular/core';
import { BlockChain } from 'src/lib/blockchain';
import { ec as EC } from 'elliptic';

export type WalletKey = {
  keyObj: EC.KeyPair;
  publicKey: string;
  privateKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockChainInstance = new BlockChain();
  public walletKeys: WalletKey[] = [];

  constructor() {
    this.blockChainInstance.difficulty = 1;
    this.blockChainInstance.minePendingTransactions('my-wallet-address');
    this.generateWalletKeys();
  }

  getBlocks() {
    return this.blockChainInstance.chain;
  }

  addTransaction(tx) {
    this.blockChainInstance.addTransaction(tx);
  }

  private generateWalletKeys(): void {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    })
  }
}
