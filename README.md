# undercoin
Bitcoin utility belt

### usage

```bash
npm install undercoin
```
In node or browser
```javascript
const undercoin = require('undercoin')
```


### api

**btcToSatoshi**   
`undercoin.btcToSatoshi(btcAmount)`  
Converts BTC to satoshis

```javascript
undercoin.btcToSatoshi(1) // 100000000
```

**satoshiToBtc**   
`undercoin.satoshiToBtc(satoshis)`  
Converts satoshis to BTCs

```javascript
undercoin.satoshiToBtc(15000000) // 100000000
```

**newAddress**   
`undercoin.newAddress(testnet)`  
Creates a new Bitcoin address
if `testnet` param (boolean) is supplied the address will be testnet

```javascript
undercoin.newAddress() // 3FM1J7HkVcZeHTcWadxCN9UyTLYDpUxjJn
```

**getAddress**   
`undercoin.newAddress(testnet, callback)`  
Get a (recent) address on the blockchain

```javascript
undercoin.getAddress((err, address) => console.log(address))
// 3FM1J7HkVcZeHTcWadxCN9UyTLYDpUxjJn
```

MIT
