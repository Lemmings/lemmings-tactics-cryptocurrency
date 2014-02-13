var agent = null;
var https = null;
exports.initialize = function(){
    https = require('https');
    agent = new https.Agent({maxSockets: 1});
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        if(lists.length > 0){
            callback(null, lists);
        }else{
            callback(null, []);
        }
    });
    var BASE_URL = 'https://btc-e.com/api/2/';
    args.api.forEach(function(v){
        var url = BASE_URL + v;
        async.inc();
        try{
            inputTools.https_get(url, agent, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    try{
                        var w = JSON.parse(res);
                        w.api = v;
                        lists.push(w);
                    }catch(e){
                        console.log(res);
                        console.log(e.stack);
                    }
                }
                async.dec();
            });
        }catch(err){
            console.log(err.stack);
            async.dec();
        }
    });
};
