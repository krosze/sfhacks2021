
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whatsupbody-bc8d6-default-rtdb.firebaseio.com"
});

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
var fbAuth = require("firebase/auth");
var fbFirestone = require("firebase/firestore");

// 
// 

var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            emptyObject:(obj) => {
                return !(obj.constructor === Object && Object.keys(obj).length == 0);
            }
        }
    })
);

var mysqlSessionStore = new mysqlSession(
    {}, require('./config/database')
);

app.use(sessions({
    key: "csid",
    secret: "This is a secret from csc317",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "hbs");

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) =>{
    console.log(req.session);
    if(req.session.username){
        res.locals.logged = true;
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error', { err_message: err });
});

module.exports = app;
