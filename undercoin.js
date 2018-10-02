//#### UNDERCOIN - Bitcoin utility belt ####

const undercoin = {}

//Convert a BTC decimal value (ie- 1.3 BTC) to Satoshis:
undercoin.btcToSatoshi = (bitcoin) => Math.round(bitcoin * 100000000)

undercoin.satoshiToBtc = (satoshis) => satoshis / 100000000

module.exports = undercoin
