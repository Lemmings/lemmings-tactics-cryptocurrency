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
        var url = v.url+'/index.php?page=api&action='+v.api+'&api_key='+v.key;
        var work = url.split("://");
        if(work[0] === 'https'){
            async.inc();
            inputTools.https_get(url, function(err, res){
                if(err){
                }else{
                    lists.push(JSON.parse(res));
                }
                async.dec();
            });
        }else{
            async.inc();
            inputTools.http_get(url, function(err, res){
                if(err){
                }else{
                    lists.push(JSON.parse(res));
                }
                async.dec();
            });
        }
    });
};
