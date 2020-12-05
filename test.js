var test = require('tape'),
    undercoin = require('./undercoin.js')

test('Can convert BTC to satoshis', t => {
  t.plan(2)

  var satoshisInOneBTC = '100000000',
      satoshis = undercoin.btc2sat(1)

  t.equals(satoshis, satoshisInOneBTC, 'Accurately converts 1 BTC to (100 million) satoshis' )

  var satoshisNotEquallingOneBTC = 312312312312323123123

  t.notOk(satoshis == satoshisNotEquallingOneBTC)
})

test('Can convert satoshis to BTC', t => {
  t.plan(1)
  var oneFiftyMillionSats = 150000000,
      btc = undercoin.sat2btc(oneFiftyMillionSats)

  t.equals(btc, '1.5', 'Accurately converts 150 million satoshis to 1.5 BTC')
})

test('Can convert mSatoshis to BTC', t => {
  t.plan(2) 
  let oneBTCinMsats = 100000000000
  let btc = undercoin.msat2btc(oneBTCinMsats)
  t.equals(btc, '1', 'Accurately converts 100,000,000,000 mSatoshis to Bitcoin')
  let oneMsatInBTC = '0.00000000001'
  let btc2 = undercoin.msat2btc(1)
  t.equals(btc2, oneMsatInBTC, 'Accurately converts one msat to BTC')

})

test('Can convert mSatoshis to regular satoshis', t => {
  t.plan(1) 
  let mSatsInOneSatoshi = '1000'
  let sats = undercoin.msat2sat(mSatsInOneSatoshi)
  t.equals(sats, '1', 'Accurately converts 1000 mSatoshis to 1 satoshi')
})

test('Can convert satoshis to mSatoshis', t => {
  t.plan(1) 
  let mSatsInOneSatoshi = '1000'
  let mSats = undercoin.sat2msat(1)
  t.equals(mSats, mSatsInOneSatoshi, 'Accurately converts 1 Satoshi to 1000 mSatoshis')
})


const bitcoinValidate = require('bitcoin-address-validation')

const CoinKey = require('coinkey')

test('Can create a new keypair?', t => {
  t.plan(1)
  let keyPair = undercoin.newKeypair()

  //convert the private key into a buffer:
  const bytes = Buffer.from(keyPair.private, 'hex')

  //and feed to CoinKey which can re-create the keypair from said buffer:
  let coinKeypair = new CoinKey(  bytes  )

  //now test that the resulting keypair is valid:
  let address = coinKeypair.publicAddress
  t.ok (  bitcoinValidate(address), 'The keypair produces a valid BTC mainnet address')
})

test('Can get an existing Bitcoin address?', t => {
  t.plan(1)
  undercoin.getAddress(false, (err, bitcoinAddress) => {
    if(err) {
      console.log(err)
      return t.fail(err)
    }
    console.log(bitcoinAddress)
    t.ok (  bitcoinValidate(bitcoinAddress), 'The address we got is a valid Bitcoin address')
  })
})

test('Can create a Bitcoin address?', t => {
  t.plan(2)
  var newAddress = undercoin.newAddress()
  //Verify it is actually a valid Bitcoin address:
  t.ok( bitcoinValidate(newAddress), 'The new Bitcoin address validates OK')
  t.notOk( bitcoinValidate(newAddress.testnet), 'New Bitcoin address is not testnet address')
})

test('Can create a Bitcoin testnet address?', t => {
  t.plan(2)
  let newAddress = undercoin.newAddress(true)
  let newAddressValidated = bitcoinValidate(newAddress)
  //Verify it is actually a valid Bitcoin testnet address:
  t.ok (   newAddressValidated , 'The new Bitcoin address validates OK')
  t.equals (  newAddressValidated.network, 'testnet', 'New Bitcoin address is testnet address' )
})


const bs58check = require('bs58check')
const wif = require('wif')

test('Can create a WIF?', t => {
  t.plan(3)
  let newWIF = undercoin.newWIF()
  let isValid = bs58check.decode(newWIF)
  t.ok(isValid, 'WIF is a valid Base 58 string')

  //secondary check...
  let isValid2 = wif.decode(newWIF)
  t.ok(isValid2, 'WIF decoded OK')

  //another check; make a Bitcoin address from the WIF: 
  let btcAddressFromWif = undercoin.addressFromWIF( newWIF  )
  let validated = bitcoinValidate(btcAddressFromWif )

  t.ok(validated && validated.network === 'mainnet', 'Address generated from WIF is valid and BTC mainnet')
})

test('Can create a WIF (testnet)?', t => {
  t.plan(3)
  let newWIFTestnet = undercoin.newWIF(true)

  let isValid = bs58check.decode(newWIFTestnet)
  t.ok(isValid, 'WIF is a valid Base 58 string')

  let isValidTestnet = wif.decode(newWIFTestnet)
  t.ok(isValidTestnet, 'WIF decoded OK')

  //outputs a testnet address
  let newTestnetAddress = undercoin.addressFromWIF( newWIFTestnet, true )
  let validated = bitcoinValidate(newTestnetAddress )
  t.ok(validated && validated.network === 'testnet', 'Address generated from WIF is valid and BTC testnet')
})

test.skip('Can verify a string is a WIF?', t => {
  //let thisIsAWif =

})

test.skip('Can send BTC?', t => {
  t.plan(2)
  let notAValidAttempt = undercoin.sendBTC(null, 'test', 1)
  t.notOk(notAValidAttempt)

  let privateKey = 'cPBieu6V2RwoKdZn6bNtWBp6YdMFAD5PrG8BNT2Ezuviqva83qwL' 
  //^ needs testnet BTC!!
  let destinationAddress =  'n4Xj9EGkZYMKNGjfKtiqcZtUyoe2NXqs3K' //< testnet address

  let testnetAttempt = undercoin.sendBTC(privateKey, destinationAddress, 0.001)
  t.ok(testnetAttempt)
})