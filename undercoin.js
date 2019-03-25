//#### UNDERCOIN - Bitcoin utility belt ####

const undercoin = {}

//Convert a BTC decimal value (ie- 1.3 BTC) to Satoshis:
undercoin.btcToSatoshi = (bitcoin) => Math.round(bitcoin * 100000000)

undercoin.satoshiToBtc = (satoshis) => satoshis / 100000000


const bitcoin = require('bitcoinjs-lib')

undercoin.newAddress = (testnet) => {
  //first create a Bitcoin testnet address:
  let TESTNET = bitcoin.networks.testnet
  let keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET })
  let { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network : TESTNET })
  return address
}

module.exports = undercoin
