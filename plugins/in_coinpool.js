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
        var work = v.url.split("://");
        var http_get = inputTools.http_get;
        if(work[0] === 'https'){
            http_get = inputTools.https_get;
        }
        async.inc();
        try{
            http_get(url, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    var w = JSON.parse(res);
                    w.getpoolstatus.data.pool_name = work[1]
                    lists.push(w);
                }
                async.dec();
            });
        }catch(err){
            console.error(err.stack);
            async.dec();
        }
    });
};
