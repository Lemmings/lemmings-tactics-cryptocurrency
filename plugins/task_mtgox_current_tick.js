exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var data = inputTools.kvs[args.input];
    var out = {};
    data.forEach(function(v){
        var name = "BTC_" + v.api.split('/')[0].substr(3, 3);
        out[name] = {
           tick : parseFloat(v.data.last.value),
           time : parseInt(v.data.now.substr(0, v.data.now.length-6)),
        };
    });
    callback(null, out);
};
