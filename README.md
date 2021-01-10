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
<a name="api"></a>

For functions that accept a `testnet` parameter, said parameter needs be just `true` (otherwise the function will default to mainnet).


**newAddress**   
`undercoin.newAddress(testnet)`  
Creates a new Bitcoin address.  

```javascript
undercoin.newAddress() // 3FM1J7HkVcZeHTcWadxCN9UyTLYDpUxjJn
```
Note that no private key is provided (you can never spend funds sent to this address).   
<br>   

**newKeypair**  
`undercoin.newKeypair(testnet)`  
Creates a new Bitcoin keypair; an object containing a private and public key  
```javascript
undercoin.newKeypair() 
// {
//   private : 12b9a63d4b0d355b2b26d62a56bc165bae2850785d0584d28f1d6db86c66616e,
//   public : 03ec7db1055f42f6ea1baf2206ffe90d354a18654774fa4cbc8c36390dfdab73ee
// }
```
<br>  
   
**newWIF**  
`undercoin.newWIF(testnet)`  
Creates a new WIF 
```javascript
undercoin.newWIF() 
// KxvdPD4tYwiiDsjMTNNgDiXWx2jK4p3mnLhaATx5NzaMPwMakquy
```
<br>  
  

**addressFromWIF**   
`undercoin.addressFromWIF(wif, testnet)`  
Output a public Bitcoin address from a WIF

```javascript
undercoin.addressFromWIF(wif)
// 1AoUMgXS3YV5LcJCuCjNzXEctL73cR8FgJ
```
<br>


**getAddress**   
`undercoin.getAddress(testnet, callback)`  
Get a (recent) address on the blockchain

```javascript
undercoin.getAddress((err, address) => console.log(address))
// 3FM1J7HkVcZeHTcWadxCN9UyTLYDpUxjJn
```
<br>  

**isSegwit**
`undercoin.isSegwit(address)`
Determines if address is Segwit (Bech32) or not.

```javascript 
undercoin.isSegwit('bc1qx9lplhcemust5q7vjejmfaglg8h6knu7a92r5p')
// true
```



#### Conversion functions

The following conversion functions are directly from [fmtbtc], see also that repo for more conversions beyond this selection below:  

<br>

**btc2sat**   
`undercoin.btc2sat(btcAmount)`  
Converts BTC to satoshis

```javascript
undercoin.btc2sat(1) // '100000000'
```
<br>

**sat2btc**   
`undercoin.sat2btc(satoshis)`  
Converts satoshis to BTC

```javascript
undercoin.sat2btc(15000000) // '0.15'
```
<br>

**btc2msat**   
`undercoin.btc2msat(btcAmount)`  
Converts BTC to 1/1000th of a satoshi

```javascript
undercoin.btc2msat(1) // '100000000000'
```
<br>


**msat2btc**   
`undercoin.msat2btc(mSatoshis)`  
Converts mSatoshis to BTC. 

```javascript
undercoin.msat2btc(1) // '0.00000000001'
```
<br>

**msat2sat**   
`undercoin.msat2sat(mSatoshis)`  
Converts mSatoshis to regular satoshis. 

```javascript
undercoin.msat2sat(1000) // '1'
```
<br>


**sat2msat**   
`undercoin.msat2sat(satoshis)`  
Converts satoshis to mSatoshis. 

```javascript
undercoin.sat2msat(1) // '1000'
```
<br>



MIT


[BigNumber]: https://mathjs.org/docs/datatypes/bignumbers.html
[fmtbtc]: https://github.com/shesek/fmtbtc 
