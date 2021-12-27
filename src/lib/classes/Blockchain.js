const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(ts = "", data = []) {
        this.ts = ts;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    };

    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    };

    mine(diff) {
        while (!this.hash.startsWith(Array(diff + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        };
    };
};

class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())],
        this.diff = 5;
        this.blckTime = 30000;
    };

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    };

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.diff);
        this.chain.push(Object.freeze(block));
        this.diff += Date.now() - parseInt(this.getLastBlock().ts) < this.blckTime ? 1 : -1;
    };

    isValid(blockchain = this) {
        for(let i = 1; i < blockchain.chain.length; i++) {
            const currBlck = blockchain.chain[i];
            const prevBlck = blockchain.chain[i - 1];

            if(currBlck.hash !== currBlck.getHash() || prevBlck.hash !== currBlck.prevHash) {
                return false;
            };
        };

        return true;
    };
};

module.exports = { Block, Blockchain };