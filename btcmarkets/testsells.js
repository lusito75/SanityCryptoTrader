var secrets    = require('./secrets.json'),
    BTCMarkets = require('btc-markets');

var client = new BTCMarkets(secrets.api_key, secrets.api_secret);
var numberConverter = 100000000;    // one hundred million

function getBalance(client, crypto, callback) {
    var bal = 0;
    client.getAccountBalances(function(err, data) {
        if (err){
            console.log(err.message);
            reject(err.message);
        }
        else {
            data.forEach(function(account)
            {
                if (account.currency === crypto) {
                    bal = account.balance;
                }
            });
        }
        callback(bal);
    });
}

function createSellOrder(client, crypto, price, volume, callback){
    console.log("trying to sell "+volume+" "+crypto+" for "+price);
    client.createOrder(crypto, "AUD", price * numberConverter, volume * numberConverter, 'Ask', 'Market', "707070", function(err, data)
    {
        console.log(err, data);
        callback(err, data);
    });
}

getBalance(client, "XRP", function(balance){
    console.log("my XRP balance is: "+balance);
    var askPrice = 3.9;
    var volume = balance/numberConverter;
    // create buy order .. call createOrder synchronously here
    createSellOrder(client, "XRP", askPrice, volume, function(err, res){
        console.log('**SELL** => BTC response**');
        console.log(err, res);
    });
});

// market sell for 0.0001 BTC
// client.createOrder("BTC", "AUD", null, 0.0001 * numberConverter, 'Ask', 'Market', null, function(err, data)
// {
//     console.log(err, data);
// });