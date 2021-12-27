const { Block, Blockchain} = require("../lib/classes/Blockchain.js");

const Avalon = new Blockchain();

Avalon.addBlock(new Block(Date.now().toString(), {
    from: "Carl W. Hansen",
    to: "Eliela J. Cuevas",
    amount: 100
}));

console.log(Avalon.chain);