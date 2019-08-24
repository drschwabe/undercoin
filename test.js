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
  //Verify it is actually a valid Bitcoin testnet address:
  t.ok (   bitcoinValidate(newAddress) , 'The new Bitcoin address validates OK')
  t.ok (  bitcoinValidate(newAddress).testnet, 'New Bitcoin address is testnet address' )
})

test('Can create a Bitcoin address?', (t) => {
  t.plan(2)
  var newAddress = undercoin.newAddress()
  //Verify it is actually a valid Bitcoin address:
  t.ok( bitcoinValidate(newAddress), 'The new Bitcoin address validates OK')
  t.notOk( bitcoinValidate(newAddress.testnet), 'New Bitcoin address is not testnet address')
})

test('Can get an existing Bitcoin address?', (t) => {
  t.plan(1)
  undercoin.getAddress(false, (err, bitcoinAddress) => {
    if(err) {
      console.log(err)
      return t.fail(err)
    }
    t.ok (  bitcoinValidate(bitcoinAddress), 'The address we got is a valid Bitcoin address')
  })
})
