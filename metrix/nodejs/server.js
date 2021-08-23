
const http = require('http');
const url = require('url');


 function serverUp(){
    http.createServer((request,response)=>{
        let RequestValue =  url.parse(request.url,url);
        
        if(RequestValue.query.id != null && RequestValue.query.url != null){
            var id  = RequestValue.query.id;
            var urlNow = RequestValue.query.url;
            this.id = RequestValue.query.id;
            this.urlNow = RequestValue.query.url;

        }
    }).listen(26001);
 }

 module.exports.serverUp = serverUp;