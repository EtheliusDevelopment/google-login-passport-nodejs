//STEP 40 creo funzione per proteggere rotte sotto login => STEP 41 importo la funzione in routes/index.js per proteggere rotta => STEP 41
// STEP 41

module.exports = {
    ensureAuth : function (req, res, next){
        if(req.isAuthenticated()){
            return next()
        } else {
            res.redirect ('/')
        }
    },
    // se l-utente e gia autenticato non richiedere nuovamente login
    ensureGuest : function (req, res, next){
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}