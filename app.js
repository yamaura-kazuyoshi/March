const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user'); //追加
const path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done){
    // ここで username と password を確認して結果を返す
	if (なんらかのエラー) {
        return done(エラー内容);
    }
    else if (失敗) {
        return done(null, false);
    }
    else if (成功) {
        return done(null, username);
    }
}));
app.use(passport.initialize());

app.use('/user', userRouter);　//追加

const port = 3000;

// const options = {
// 	useUnifiedTopology : true,
// 	useNewUrlParser : true
// }

//app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://127.0.0.1/test_db',options);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('Database connection successful'));

app.listen(port, 
	() => console.log(`Example app listening on port ${port}!`));