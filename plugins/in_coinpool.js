var http_agent = null;
var http = null;
var https_agent = null;
var https = null;
exports.initialize = function(){
    http = require('http');
    http_agent = new http.Agent({maxSockets: 1});
    https = require('https');
    https_agent = new https.Agent({maxSockets: 1});
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
        var agent = http_agent;
        if(work[0] === 'https'){
            http_get = inputTools.https_get;
            agent = https_agent;
        }
        async.inc();
        try{
            http_get(url, agent, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    try{
                        var w = JSON.parse(res);
                        w.getpoolstatus.data.pool_name = work[1]
                        lists.push(w);
                    }catch(err){
                        console.error(err.stack);
                    }
                }
                async.dec();
            });
        }catch(err){
            console.error(err.stack);
            async.dec();
        }
    });
};
