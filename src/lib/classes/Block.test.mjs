import SHA256 from "crypto-js/sha256.js";
// const SHA256 = data => crypto.createHash("sha256").update(data).digest("hex");

export default class Block {
    constructor(ts, txs, prevHash = "") {
        this.ts = ts;
        this.txs = txs;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    };

    calculateHash() {
        return SHA256(this.ts + JSON.stringify(this.txs) + this.prevHash + this.nonce).toString();
    };

    hasValidTxs() {
        for(const tx of this.txs) if(!tx.isValid()) return false;

        return true;
    };

    mineBlck(diff) {
        while(this.hash.substring(0, diff) !== Array(diff + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        };

        console.log("Block mined, nonce: " + this.nonce + ", hash: " + this.hash);
    };
};