import { BlockChain, Transaction } from "./blockchain";

const sainuCoin = new BlockChain();
sainuCoin.createTransaction(new Transaction('address1', 'address2', 100));
sainuCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner...');
sainuCoin.minePendingTransactions('sainu-address');

console.log('\nBalance of sainu is ', sainuCoin.getBalanceOfAddress('sainu-address'));

console.log('\n Starting the miner again...');
sainuCoin.minePendingTransactions('sainu-address');

console.log('\nBalance of sainu is ', sainuCoin.getBalanceOfAddress('sainu-address'));
