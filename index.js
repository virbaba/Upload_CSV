// start of placement cell website
// import express
const express = require('express');

// creating express app
const app = express();

// defining port
const port = 1002;

// import express-ejs-layouts package
const expressLayout = require('express-ejs-layouts');

// for getting the post request
app.use(express.urlencoded());

// for getting the json request
app.use(express.json());

// using static file
app.use(express.static(__dirname+'/assets')); 

// using layout before to routes
app.use(expressLayout);

// use style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// import cookie-parser
const cookieParser = require('cookie-parser');
// using for create session 
// import session package
const session = require('express-session');

// set up of view engine
app.set('view engine','ejs');
app.set('views','./views');

// import connect-flash for flash messagge
const flash = require('connect-flash');
const custMware = require('./config/customflash');

// session cookie bana rhea hai
app.use(session({
    name: 'codeial',
    // this for encrytion abhi random text use kiya hai after change the screet before deployment in production mode
    secret: 'blasomething',

    saveUninitialized: false,
    resave: false,
    // age of cookie
    cookie: {
        maxAge: (1000 * 60 * 10000)
    },

}));

// using flash
app.use(flash());
// customize the flash message
app.use(custMware.flash);


// using router
app.use('/', require('./router'));

// listening on port
app.listen(port, (err)=>{
    if(err){
        console.log('error in listening');
        return;
    }
    console.log(`sun liya on ${port}`);
})