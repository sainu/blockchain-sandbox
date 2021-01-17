import { Component, OnInit } from '@angular/core';
import { BlockchainService, WalletKey } from 'src/app/services/blockchain.service';
import { Transaction } from 'src/lib/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public newTx: Transaction;
  public walletKey: WalletKey;

  constructor(private blockchainService: BlockchainService) {
    this.walletKey = blockchainService.walletKeys[0];
  }

  ngOnInit(): void {
    this.newTx = new Transaction();
  }

  createTransaction() {
    this.newTx.timestamp = Date.now();
    this.newTx.fromAddress = this.walletKey.publicKey;
    this.newTx.signTransaction(this.walletKey.keyObj);

    this.blockchainService.addTransaction(this.newTx);

    this.newTx = new Transaction();
  }

}
