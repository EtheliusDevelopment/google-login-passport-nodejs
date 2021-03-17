const path = require ('path'); // STEP 20 => STEP 21 creo sottocartella css e file style.css
const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');  // STEP 9 = STEP 10 modifico estensione file Handlebars
const methodOverride = require ('method-override') //STEP 86 importo metodo Overrid => STEP 87 configuro nel file app il metodo
const passport = require ('passport');
const session = require ('express-session')
//STEP 42 importo MongoStore per salvare le sessioni nel db => STEP 43 configuro Mongo store in session nel file APP ( guardare giu )
const MongoStore = require ('connect-mongo') (session)
//STEP 6 Importo la connessione al DB  => STEP 7 chiamo la connessione
const connectDB = require ('./config/db');

//Load config  STEP 1 => STEP 2 setto le variabili nel file config.env
dotenv.config({path: './config/config.env'});

//STEP 26 configuro passport => STEP 27 configuro il middleware di Passport in app.js
require ('./config/passport')(passport)

// STEP 7 chiamo la connessione al DB => STEP 8 imposto morgan per la modalita' DEV
connectDB()

const app = express()

//STEP 63 aggiungo la funzione body-parser => STEP 64 torno a configurare stories in routes
//@Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//STEP 87 configuro metodo override => STEP 88 applico metodo override a edit.hbs
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// STEP 8 Error Logging in console => STEP 9 imposto il view engine ( Handlebars)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

//STEP 66 importo helper per Handlebar per formattare date => STEP 67 aggiungo la funzione nelle graffe della configurazione Handlebars
// Handlebars Helper
//STEP 73 aggiungo due nuovi helpers ( stripTags e truncate) => STEP 74 aggiungo i nuovi helpers ad app.engine di handlebars
// STEP 76 importo helper editIcon => STEP 77 applico helper ad app.engine di handlebars
const {formatDate, stripTags, truncate, editIcon, select} = require ('./helpers/hbs')

//STEP 10 HANDLEBARS view ENGINE con estensione HBS e setto il defaultLayout => STEP 11 Creo Cartella ttocartella layouts ed i files main e login.hbs
app.engine('.hbs', 
exphbs({
  helpers : {   //STEP 67 =. STEP 68 vado in dashboard.hbs ed aggiungo formatDate a <td> {{createdAt}}</td>
      formatDate,
      //STEP 74 aggiungoi nuovi helpers => STEP 75 applico gli helpers a stories/index.hbs
      stripTags,
      truncate,
      //STEP 77 aggiungonuovo helper => STEP 78 creo una variabile globale per gli user in app.js 
      editIcon,
      //STEP 85 importo helper select => STEP 86 importo middleware override
      select,
}, 
defaultLayout: 'main', 
extname: '.hbs'
})
);
app.set('view engine', '.hbs');

//STEP 28 express-session middleware => STEP 29 vado a configurare il file passport.js nella cartela config
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //STEP 43 configuro MongoSTore per salvare sessioni => STEP 44 isolo la variabile nome in routes/index.js
    store : new MongoStore ({mongooseConnection : mongoose.connection})
  }))

//STEP 27 configuro il middleware di passport ed importo express-session => STEP 28 configuro Express Session
app.use(passport.initialize());
app.use(passport.session())

//STEP 78 creo variabile global per gli users => applico helper a stories/index.hbs
//Set Global Var

app.use(function (req, res, next){
  res.locals.user = req.user || null
  next ()
})

//STEP 19 setto una cartella per i file statici 'public' => step 20 importo la funzione path
app.use(express.static(path.join(__dirname, 'public')))

//ROUTES

//STEP 13 importo le rotte da routes/index STEP 14 => creo un fil in VIEWS chiamato dashboard.hbs
app.use('/', require('./routes/index'))
//STEP 35 aggiungo la rotta auth
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))   //STEP 58 => STEP 59 aggiungo in main.hbs lo script per il form

//configuro Port Server STEP 4
const PORT = process.env.PORT || 3000



//STEP 4 (linea di comando perr far partire la modalita DEV = npm run dev) => STEP 5 create db.js in /CONFIG per connettere DB
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
