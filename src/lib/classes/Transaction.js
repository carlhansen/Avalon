const { SHA256 } = require("crypto-js"),
        Elliptic = require("elliptic");

const ec = new Elliptic.ec('secp256k1');

class Transaction {
    constructor(fromAdd, toAdd, amount, msg) {
        this.fromAdd = fromAdd;
        this.toAdd = toAdd;
        this.amount = amount;
        this.msg = msg;
    };

    calculateHash() {
        return SHA256(this.fromAdd + this.toAdd + this.amount + this.msg).toString();
    };

    signTx(signingKey) {
        if(signingKey.getPublic('hex') !== this.fromAdd) throw new Error("You cannot sign transactions to other wallets!");

        const txHash = this.calculateHash();

        const sign = signingKey.sign(txHash, 'base64');

        this.signature = sign.toDER('hex');

        console.log("Signature: " + this.signature);
    };

    isValid() {
        if(this.fromAdd === null) return true;

        if(!this.signature || this.signature.length === 0) throw new Error("No signature in this transaction.")

        const publicKey = ec.keyFromPublic(this.fromAdd, 'hex');
        
        return publicKey.verify(this.calculateHash(), this.signature);
    };
};  

module.exports = Transaction;