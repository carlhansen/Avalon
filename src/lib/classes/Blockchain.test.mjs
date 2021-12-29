import Block from './Block.test.mjs';
import Transaction from './Transaction.test.mjs';

export default class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlck()];
        this.diff = 3;
        this.pendingTxs = [];
        this.miningReward = 1;
    };

    createGenesisBlck() {
        return new Block(Date.now(), [], '');
    };

    getLatestBlck() {
        return this.chain[this.chain.length - 1];
    };

    addTx(tx) {
        if(!tx.fromAdd || !tx.toAdd) throw new Error("Transaction must include a from & to address!");

        if(!tx.isValid()) throw new Error("Cannot add invalid transation to the chain.");

        this.pendingTxs.push(tx);
    };

    minePendingTxs() {
        const latestBlck = this.getBlck(this.getHeight());

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
                if(tx.fromAdd === add) balance -= amount;
                
                if(tx.toAdd === add) balance += amount;
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