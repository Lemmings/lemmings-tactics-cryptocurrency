exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var data = inputTools.kvs[args.input];
    var out = {};
    data.forEach(function(v){
        var name = v.base + '_' + v.counter;
        out[name] = {
            tick : v.close,
            time : v.to,
        };
        var rname = v.counter + '_' + v.base;
        out[rname] = {
            tick : 1 / v.close,
            time : v.to,
        };
    });
    var LTC_BTC = out['LTC_MONA'].tick / out['BTC_MONA'].tick;
    out['LTC_BTC'] = {
        tick : LTC_BTC,
        time : out['LTC_MONA'].time,
    };
    var XPM_BTC = out['XPM_MONA'].tick / out['BTC_MONA'].tick;
    out['XPM_BTC'] = {
        tick : XPM_BTC,
        time : out['XPM_MONA'].time,
    };
    callback(null, out);
};
