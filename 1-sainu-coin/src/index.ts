import { BlockChain, Transaction } from "./blockchain";
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('2e1639a19788f5ce4bf1ef6fff8fdf92e3a902d09266decde8e9745673ccf17e');
const myWalletAddress = myKey.getPublic('hex');

const sainuCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
sainuCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
sainuCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of sainu is ', sainuCoin.getBalanceOfAddress(myWalletAddress));

// sainuCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', sainuCoin.isChainValid());

// console.log(JSON.stringify(sainuCoin, null, 4));
