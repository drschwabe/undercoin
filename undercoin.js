//#### UNDERCOIN - Bitcoin utility belt ####

const undercoin = {}

//Convert a BTC decimal value (ie- 1.3 BTC) to Satoshis:
undercoin.btcToSatoshi = (bitcoin) => Math.round(bitcoin * 100000000)

undercoin.satoshiToBtc = (satoshis) => satoshis / 100000000


const bitcoin = require('bitcoinjs-lib')

undercoin.newAddress = (isTestnet) => {
  let network
  network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
  //create a Bitcoin address:
  let keyPair = bitcoin.ECPair.makeRandom({ network: network })
  let { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network : network })
  return address
}

module.exports = undercoin
