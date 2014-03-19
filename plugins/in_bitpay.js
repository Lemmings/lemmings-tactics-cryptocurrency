exports.initialize = function(){};
exports.finalize = function(){};
// api = rates
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var results = [];
    var crawler = inputTools.crawler;
    var async = new inputTools.SimpleAsync(function(){
        if(results.length > 0){
            callback(null, results);
        }else{
            callback(null, []);
        }
    });
    args.list.forEach(function(v){
        var url = 'https://bitpay.com/api/' + v;
        async.inc();
        crawler.request_get_json(url, function(err, data){
            if(!err){
                results.push(data);
            }
            async.dec();
        });
    });
};
