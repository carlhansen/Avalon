import Blockchain from "../lib/classes/Blockchain.test.mjs";
import Transaction from "../lib/classes/Transaction.test.mjs";
import { createWallet, validateWallet } from "../lib/classes/Wallet.test.js";

const avalon = new Blockchain();

const myWallet = createWallet(),
      testWallet = createWallet();

console.log("Is the myWallet from privKey equal to pubKey", validateWallet(myWallet.privKey, myWallet.pubKey));

const tx1 = new Transaction(myWallet.pubKey, testWallet.pubKey, 69);

tx1.signTx(myWallet.keyPair);

avalon.addTx(tx1);

console.log("Starting the miner of the block 1....");

avalon.minePendingTxs(myWallet.pubKey);

console.log("Balance of testWallet's account is: ", avalon.getBalanceOfAdd(testWallet.pubKey));

console.log("Is the chain valid?", + avalon.isChainValid());

avalon.chain[1].txs[0].amount = 200;

console.log("Is the chain valid?", + avalon.isChainValid());

console.log(JSON.stringify(avalon, null, 4));
