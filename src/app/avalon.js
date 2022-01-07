const Blockchain = require("../lib/classes/Blockchain.js"),
      Transaction = require("../lib/classes/Transaction.js");

const { createWallet, validateWallet } = require("../lib/classes/Wallet.js");

const myWallet = createWallet(),
      testWallet = createWallet();

const avalon = new Blockchain();

console.log("Is the myWallet from privKey equal to pubKey", validateWallet(myWallet.privKey, myWallet.pubKey));

const tx1 = new Transaction(myWallet.pubKey, testWallet.pubKey, 69);

tx1.signTx(myWallet.keyPair);

avalon.addTx(tx1);

console.log("Starting the miner of the block 1....");

avalon.minePendingTxs(myWallet.pubKey);

console.log("Balance of testWallet's account is: ", avalon.getBalanceOfAdd(testWallet.pubKey));

console.log("Is the chain valid?", + avalon.isChainValid());

// avalon.chain[1].txs[0].amount = 200;

// console.log("Is the chain valid?", + avalon.isChainValid());

console.log(JSON.stringify(avalon, null, 4));