exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, lists);
    });
    args.pools.forEach(function(v){
        var url = 'http://'+v.url+'/'+v.api+'?'+v.param;
        async.inc();
        inputTools.http_get(url, function(err, res){
            if(err){
            }else{
                lists.push(JSON.parse(res));
            }
            async.dec();
        });
    });
};
