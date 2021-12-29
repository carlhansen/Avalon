import SHA256 from "crypto-js/sha256.js";

import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');

export default class Transaction {
    constructor(fromAdd, toAdd, amount, msg) {
        this.fromAdd = fromAdd;
        this.toAdd = toAdd;
        this.amount = amount;
        this.msg = msg;
    };

    calculateHash() {
        return SHA256(this.fromAdd + this.toAdd + this.amount + this.msg);
    };

    signTx(signingKey) {
        if(this.fromAdd === null) return true;

        if(signingKey.getPublic('hex') !== this.fromAdd) throw new Error("You cannot sign transactions to other wallets!");

        this.hash = this.calculateHash();

        const sign = signingKey.sign(this.hash, 'base64');

        this.signature = sign.toDER('hex');

        console.log("Signature: " + this.signature);
    };

    isValid() {
        if(this.fromAdd === null) return true;

        if(signingKey.getPublic("hex") !== this.fromAdd) throw new Error("You cannot sign transactions for other wallets!");

        const publicKey = ec.keyFromPublic(this.fromAdd, 'hex');

        console.log("Signatures: " + this.signature);
        
        return publicKey.verify(this.calculateHash(), this.signature);
    };
};  