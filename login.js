var http = require('http');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

http.createServer(function(req, res) {
    if(req.method == 'POST') {
        let content = '';
        req.on('data', function(chunk) {
            content += chunk;
        });
        req.on('end', () => {
            console.log(content);
            var separator = content.indexOf('&');
            var email = content.substring(6,separator);
            email = email.replace('%40', '@');
            var password = content.substring(separator+10,content.length);
            console.log('email ' + email + ' pass ' + password);
            
            mongoclient = new MongoClient(new Server("localhost",27017),{native_parser:true});
            mongoclient.open((err,mongoclient) => {
                if(err) throw err;
                var db = mongoclient.db('todo_test');
                db.collection('user').find({_id:email}, (err,result) => {
                    if(err) throw err;
                    console.log(result);
                });
            });
            res.end('ok');
        });
    }
    else {
        fs.readFile('index.html', function (error, data) {
            if(error) throw error;
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });
    }
}).listen(8080);

