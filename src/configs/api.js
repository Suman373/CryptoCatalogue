
//  Lists all the crypto according to market cap in the given currency
export const CryptoList = (currency)=> 
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

// api endpoint for single crypto coin
export const SingleCrypto =(id)=>
    `https://api.coingecko.com/api/v3/coins/${id}`


// api endpoint for 7 trending Coins according to the currency in the last 24hrs
export const TrendingCrypto = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;