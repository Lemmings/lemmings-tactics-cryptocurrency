var crypto = null;
var querystring = null;
var hash_hmac = function(argo, data, key){
    var hash = crypto.createHmac(argo, key);
    hash.update(data);
    var hashed_data = hash.digest('hex');
    return hashed_data;
};
exports.initialize = function(){
    crypto = require('crypto');
    querystring = require('querystring');
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var request = {
        "method" : args.method,
        "nonce" : new Date()|0,
    };
    var postdata = querystring.stringify(request);
    var headers = {
        "Key" : args.key,
        "Sign" : hash_hmac('sha512', postdata, args.secret),
    };
    var URL = "https://btc-e.com/tapi";
    inputTools.https_post(URL, postdata, headers, function(err, res){
        if(!err){
            var ret = JSON.parse(res);
console.log(ret);
        }
        callback(null);
    });
};
