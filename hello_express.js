var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.get('/', (req,res) => {
    fs.readFile('index.html', (error,data) => {
        if(error) throw error;
        var index = data.toString();
        res.send(index);
    });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/login', (req,res) => {
    var email = req.body.email ;
    res.send('<h2>'+ email + '</h2>');
});
app.listen(8080, () => {
    console.log('ouvindo 8080');
}); 