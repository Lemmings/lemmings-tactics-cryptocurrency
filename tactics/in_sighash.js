exports.initialize = function(){};
exports.finalize = function(){};
var getAccount = function(data){
    var p = data.split('The total number of accounts: ');
    var p = p[1].split('</p>');
    return p[0];
}
var getRate = function(data, coin){
    var p = data.split(coin+': ');
    p = p[1].split('<br>');
    p = p[0].split('(');
    var w = p[0].split(' ');
    var amount = w[0];
    p = p[1].split(')');
    p = p[0].split(',');
    var bid = parseFloat(p[0].replace('XRP','').replace('Bid',''));
    var ask = parseFloat(p[1].replace('XRP','').replace('Ask',''));
    return {
        name : coin,
        amount : parseFloat(amount),
        ask : ask,
        bid : bid,
        avg : (bid + ask) / 2,
    };
}
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var crawler = inputTools.crawler;
    var url = 'http://www.sighash.info/';
    var result = {
        account : 0,
        coins : [],
    };
    crawler.request_get_raw(url, function(err, data){
        if(!err){
            var data = data.replace(/[\n\r]/g,"");
            result.account = getAccount(data);
            result.coins.push(getRate(data, 'sha1coin'));
            result.coins.push(getRate(data, 'sakuracoin'));
            result.coins.push(getRate(data, 'sayacoin'));
            result.coins.push(getRate(data, 'monacoin'));
        }
        callback(null, result);
    });
};
