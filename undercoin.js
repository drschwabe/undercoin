//#### UNDERCOIN - Bitcoin utility belt ####

const undercoin = {}

const CoinKey = require('coinkey')
const secureRandom = require('secure-random')
const fm = require('fmtbtc')

//Convert a BTC decimal value (ie- 1.3 BTC) to Satoshis:
undercoin.btcToSatoshi = bitcoin => fm.btc2sat(bitcoin)

//and from Satoshis to BTC decimal value:
undercoin.satoshiToBtc = satoshis => fm.sat2btc(satoshis)

//and same for mSatoshis too:
undercoin.btcToMsatoshi = bitcoin => fm.btc2msat(bitcoin )

undercoin.newAddress = isTestnet => {
  let network = isTestnet ? 0x6F : 0x00
  let bytes = secureRandom.randomBuffer(32)
  let keyPair = new CoinKey(bytes, { public : network, private : network })
  return keyPair.publicAddress
}

undercoin.newKeypair = isTestnet => {
  let network = isTestnet ? 0x6F : 0x00
  let bytes = secureRandom.randomBuffer(32)
  let keyPair = new CoinKey(bytes, network)
  let keyPairStrings = {
    private :  keyPair.privateKey.toString('hex'),
    public : keyPair.publicKey.toString('hex'),
  }
  return keyPairStrings
}

const wif = require('wif')

undercoin.newWIF = isTestnet => {
  let network = isTestnet ? 239 : 128 //< wif lib needs decimal prefix
  let bytes = secureRandom.randomBuffer(32)
  let privateKey = new Buffer( bytes, 'hex' )
  let newWIF = wif.encode(network, privateKey, true)
  return newWIF
}


undercoin.addressFromWIF = (wif, isTestnet) => {
  let network = isTestnet ? 0x6F : 0x00
  let keyPair = CoinKey.fromWif(wif, network)
  return keyPair.publicAddress
}

//### getAddress ###
const request = require('request')
const _ = require('underscore')

undercoin.getAddress = (...params) => {
  //parse args
  let callback = _.find(params, (param) => _.isFunction(param))

  if(!callback) throw 'a callback must be provided'

  //get hash of the latest block ...
  request('https://blockchain.info/q/latesthash', (err, res) => {
    if(err) {
      console.log('there was an err: ')
      console.log(err)
      return callback(err)
    }
    if(_.isEmpty(res.body)) {
      console.warn('Response from blockchain.info is unexpected:')
      console.log(res.body)
      return callback(res.body)
    }
    //TODO: check that a valid hash is returned
    let latestHash = res.body

    //get txs for block...
    request({ url: 'https://blockchain.info/rawblock/' + latestHash, json : true }, (err, res) => {
      if(err) return console.log(err)
      if(!_.isObject(res.body)) {
        console.warn('Response from blockchain.info is unexpected:')
        console.log(res.body)
        return callback(res.body)
      }
      let block = res.body
      let tx = block.tx[0].hash

      //get a transaction from the block...
      request({ url: `https://blockchain.info/rawtx/${tx}`, json : true }, (err, res) => {
        if(err) return console.log(err)
        if(!_.isObject(res.body)) {
          console.warn('Response from blockchain.info is unexpected:')
          console.log(res.body)
          return callback(res.body)
        }
        let address = res.body.out[0].addr
        return callback(null, address)
      })
    })
  })
}
//###

module.exports = undercoin