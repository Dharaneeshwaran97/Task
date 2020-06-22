const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const app = express();


const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
const db = mongoose.connection;
db.on('error', console.log.bind("Not connection "));
db.once("open", function () {
    console.log("connection successed");
})



app.engine('.html', require('ejs').__express);
// app.use(express.static(__dirname + '/public'));


bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set('view engine', 'html');
app.set('views', __dirname + '/views');


require('./models/product');
require('./models/user');


app.get('/', (req, res) => {
    res.render('register', {
        page_name: 'home',
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        page_name: 'home'
    })
});
app.get('/product', (req, res) => {
    res.render('productEntry', {
        page_name: 'home'
    });
})


require('./routes/registerRoutes')(app);
require('./routes/user')(app);

app.listen(5000, () => {
    console.log("App listening on port 5000");

})