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

MIT
