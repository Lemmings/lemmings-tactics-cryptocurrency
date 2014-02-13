exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var data = inputTools.kvs[args.input];
    var out = {};
    data.forEach(function(v){
        var name = v.api.split('/')[0].toUpperCase();
        out[name] = {
           tick : v.ticker.last,
           time : v.ticker.updated,
        };
    });
    callback(null, out);
};
