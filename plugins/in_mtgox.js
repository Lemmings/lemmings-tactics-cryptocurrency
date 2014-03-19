exports.initialize = function(){};
exports.finalize = function(){};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, lists);
    });
    var crawler = inputTools.crawler;
    var BASE_URL = 'http://data.mtgox.com/api/2/';
    args.api.forEach(function(v){
        var url = BASE_URL + v;
        async.inc();
        crawler.request_get_json(url, function(err, res){
            if(err){
                console.error('%s:%s', url, err.stack);
            }else{
                res.api = v;
                lists.push(res);
            }
            async.dec();
        });
    });
};
