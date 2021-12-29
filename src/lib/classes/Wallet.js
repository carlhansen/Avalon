const Elliptic = require("elliptic");

const ec = new Elliptic.ec("secp256k1");

function createWallet() {
    const keyPair = ec.genKeyPair();
    const pubKey = keyPair.getPublic("hex");
    const privKey = keyPair.getPrivate("hex");

    return {
        keyPair,
        pubKey,
        privKey
    };
};

function validateWallet(privKey, pubKey) {
    const key = ec.keyFromPrivate(privKey),
          pubKeyFromPrivKey = key.getPublic('hex');

    return pubKeyFromPrivKey === pubKey;
};

module.exports = { createWallet, validateWallet };