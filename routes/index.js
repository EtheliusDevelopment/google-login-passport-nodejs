//STEP 12 => STEP 13 importo le rotte nel file app.js
const express = require ("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require ('../middleware/auth')    //STEP 40 => STEP 41 aggiungo le funzioni create alle rotte
                                                                    //STEP 42 salvo le sessioni mongo ---vado in app.js e configuro MongoStore

const Story = require('../models/Story')            //STEP 48 importo modello story => STEP 49 imposto un try catch nella rotta dashboard

//STEP 13 creo rotte per il Login Dashboard ecc
//@ desc    Login/Landing Page
//@route    GET/

router.get('/', ensureGuest, (req, res)=>{       //STEP 17 = > STEP 18 importo CDN di Materialize e font awsome in main.hbs
    res.render ('login', {
         layout : 'login'           //STEP 23 specifico il layout che voglio usare per questa pagina => STEP 24 creo Api auth ID su google e le configuro in config.env
    })                              
})

//@ desc    Login/Landing Page
//@route    GET/dashboard
router.get('/dashboard', ensureAuth, async(req, res)=>{
    try {                                                                   //STEP 49 leggi sopra => STEP 50 creo una cartella error in views e creo i files 500 e 404.hbs
        const stories = await Story.find({user: req.user.id}).lean()
        res.render ('dashboard', {  // STEP 44 isolo la variabile nome => STEP 45 in views/dashboard.hbs invio messaggio personalizzato
            name : req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        //STEP 52 renderizzo pagina di errore 500.hbs => STEP 53 creo il view template delle stories in dashboard.hbs
        res.render('error/500')
    }
   
    
})



module.exports = router