exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var data = inputTools.kvs[args.input];
    var out = {};
    data.forEach(function(v){
        var name = "BTC_USD";
        out[name] = {
           tick : parseFloat(v.last),
           bid : parseFloat(v.bid),
           ask : parseFloat(v.ask),
           time : parseInt(v.timestamp),
        };
    });
    callback(null, out);
};
