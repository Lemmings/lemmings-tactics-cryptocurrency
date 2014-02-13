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
    var BASE_URL = 'http://data.mtgox.com/api/2/';
    args.api.forEach(function(v){
        async.inc();
        try{
            var url = BASE_URL + v;
            inputTools.http_get(url, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    var w = JSON.parse(res);
                    w.api = v;
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
