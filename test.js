var test = require('tape'),
    undercoin = require('./undercoin.js')

test('Can convert BTC to satoshis', (t) => {
  t.plan(2)

  var satoshisInOneBTC = 100000000,
      satoshis = undercoin.btcToSatoshi(1)

  t.equals(satoshis, satoshisInOneBTC, 'Accurately converts 1 BTC to (100 million) satoshis' )

  var satoshisNotEquallingOneBTC = 312312312312323123123

  t.notOk(satoshis == satoshisNotEquallingOneBTC)
})

test('Can convert satoshis to BTC', (t) => {
  t.plan(1)
  var satoshisInOneBTC = 150000000,
      btc = undercoin.satoshiToBtc(satoshisInOneBTC)

  t.equals(btc, 1.5, 'Accurately converts 150 million satoshis to 1.5 BTC')
})

const bitcoinValidate = require('bitcoin-address-validation')

test('Can create a Bitcoin testnet address?', (t) => {
  t.plan(2)
  var newAddress = undercoin.newAddress(true)
  //Verify it is actually a valid Bitcoin address:
  t.ok (   bitcoinValidate(newAddress) , 'The new Bitcoin address validates OK')
  t.ok (  bitcoinValidate(newAddress).testnet, 'New Bitcoin address is testnet address' )
})
