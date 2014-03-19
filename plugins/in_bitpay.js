var agent = null;                                                                                                                            
var https = null;
exports.initialize = function(){
    https = require('https');                                                                                                                  
    agent = new https.Agent({maxSockets: 1});                                                                                                 
};
exports.finalize = function(){
};
// api = rates
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, lists);
    });
    var BASE_URL = 'https://bitpay.com/api/';
    args.api.forEach(function(v){
        async.inc();
        try{
            var url = BASE_URL + v;
            inputTools.https_get(url, agent, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    var w = JSON.parse(res);
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
