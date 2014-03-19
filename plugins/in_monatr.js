exports.initialize = function(){};
exports.finalize = function(){};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var crawler = inputTools.crawler;
    var results = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, results);
    });
    args.list.forEach(function(v){
        var url = 'http://api.monatr.jp/' + v;
        async.inc();
        crawler.request_get_json(url, function(err, res){
            if(!err){
                results.push(res);
            }
            async.dec();
        });
    });
};
