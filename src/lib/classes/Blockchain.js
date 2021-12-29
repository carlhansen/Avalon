const Block = require('./Block.js'),
      Transaction = require('./Transaction.js');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlck()];
        this.diff = 3;
        this.pendingTxs = [];
        this.miningReward = 1;
    };

    createGenesisBlck() {
        return new Block(Date.now(), [], '');
    };

    getBlck(h) {
        return this.chain[h];    
    };
    
    getHeight(i) {
        return i - 1;
    };

    getLatestBlck() {
        return this.chain[this.chain.length - 1];
    };

    addTx(tx) {
        if(!tx.fromAdd || !tx.toAdd) throw new Error("Transaction must include a from & to address!");

        if(!tx.isValid()) throw new Error("Cannot add invalid transation to the chain.");

        // This doesn't technically add the tx to the chain, but add's it to the mempool.
        this.pendingTxs.push(tx);
    };

    minePendingTxs(miningRewardAdd) {
        const latestBlck = this.getBlck(this.getHeight(this.chain.length));
        
        let blck = new Block(Date.now(), this.pendingTxs, latestBlck.hash);

        blck.mineBlck(this.diff);

        this.chain.push(blck);

        console.log("Block successfully mined!");

        this.pendingTxs = [new Transaction(null, miningRewardAdd, this.miningReward)];
    };

    getBalanceOfAdd(add) {
        let balance = 0;
        
        for(const blck of this.chain) {
            for(const tx of blck.txs) {
                if(tx.fromAdd === add) balance -= tx.amount;
                
                if(tx.toAdd === add) balance += tx.amount;
            };
        };

        return balance;
    };

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currBlck = this.chain[i];
            const prevBlck = this.chain[i - 1];

            if(!currBlck.hasValidTxs()) return false;

            if(currBlck.hash !== currBlck.calculateHash()) {
                console.error("Hash not equal: " + JSON.stringify(currBlck));

                return false;
            };

            if(currBlck.prevHash !== prevBlck.calculateHash()) {
                console.error("Previous hash is incorrect: " + JSON.stringify(currBlck));

                return false;
            };
        };

        return true;
    };
};

module.exports = Blockchain;