// STEP 33 copio il file index.js per ora => STEP 34 modifico il file => STEP 35 aggiungo la rotta auth in app js => STEP 36 Creo funzione di LogOut
const express = require ("express");
const passport = require('passport');
const router = express.Router();



//@ desc    Auth with Google
//@route    GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


//@ desc    Google Auth CallBack
//@route    GET /auth/google/callback

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
});

// STEP 36 Creo funzione di LogOut  => STEP 37 creo una sottocartella partials in View ed un file _header.hbs
//@ desc    Logout User
//@route    GET /auth/logout

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})




module.exports = router