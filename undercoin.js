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

const request = require('request')

undercoin.getAddress = (isTestnet, callback) => {
  // let network
  // network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin

  //get hash of the latest block ...
  request('https://blockchain.info/q/latesthash', (err, res) => {
    if(err) return console.log(err)
    let latestHash = res.body

    //get txs for block...
    request({ url: 'https://blockchain.info/rawblock/' + latestHash, json : true }, (err, res) => {
      if(err) return console.log(err)
      let block = res.body
      let tx = block.tx[0].hash

      //get a transaction from the block...
      request({ url: `https://blockchain.info/rawtx/${tx}`, json : true }, (err, res) => {
        if(err) return console.log(err)
        let address = res.body.out[0].addr
        return callback(null, address)
      })
    })
  })
}

module.exports = undercoin
