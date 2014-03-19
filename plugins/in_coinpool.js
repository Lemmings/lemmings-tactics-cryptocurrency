exports.initialize = function(){};
exports.finalize = function(){};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, lists);
    });
    var crawler = inputTools.crawler;
    args.pools.forEach(function(v){
        var url = v.url+'/index.php?page=api&action='+v.api+'&api_key='+v.key;
        var work = v.url.split("://");
        async.inc();
        crawler.request_get_json(url, function(err, res){
            if(err){
                console.error(err.stack);
            }else{
                res.getpoolstatus.data.pool_name = work[1];
                lists.push(res);
            }
            async.dec();
        });
    });
};
