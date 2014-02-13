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
    var BASE_URL = 'https://btc-e.com/api/2/';
    args.api.forEach(function(v){
        var url = BASE_URL + v;
        async.inc();
        try{
            inputTools.https_get(url, function(err, res){
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
            console.log(err.stack);
            async.dec();
        }
    });
};
