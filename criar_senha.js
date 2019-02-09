const Cryptr = require('cryptr');
const cryptr = new Cryptr("senhaforte");
var MongoClient = require('mongodb').MongoClient;

var encrypted = cryptr.encrypt('thisistheverificationstring');
var userdata = {_id:'luizgustavofcsg@hotmail.com',
                name:'Luiz Gustavo',
                securityword:encrypted};
MongoClient.connect('mongodb://127.0.0.1:27017/', (error, mongo) => {
    if(error) throw error;
    db = mongo.db('todo_test');
    db.collection('user').insertOne(userdata, (err,res) => {
        if(err) throw err;
        console.log('inserted');
    });
});