exports.initialize = function(){};
exports.finalize = function(){};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var results = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, results);
    });
    var crawler = inputTools.crawler;
    var config = inputTools.config;
    args.list.forEach(function(v){
        var work = v.split("://");
        work = work[work.length - 1].split('/');
        var poolname = work[0];
        var url = v + '/api/stats';
        async.inc();
        crawler.request_get_json(url, function(err, obj){
            if(err){
                console.error(err.stack);
            }else{
                obj.getpoolstatus.data.pool_name = poolname;
                results.push(obj);
            }
            async.dec();
        });
    });
};
