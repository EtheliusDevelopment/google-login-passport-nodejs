// STEP 25 => STEP 26 vado in app.js importo e configuro passoport
// STEP 29 configuro passport => STEP 30 creo una cartella a livello root "models" e all-interno il file User.js
const GoogleStrategy = require ('passport-google-oauth20').Strategy
const mongoose = require ('mongoose')
//STEP 32 importo lo UserSchema => esporto una funzione ( da documentazione PassportJS) =>STEP 33 creo nuovo file in routes auth.js
const User = require ('../models/User')





module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
                
      },
    

      async (accessToken, refreshToken, profile, done) =>{      // da documentazione passport sostituisco cb per done
               
        console.log(profile);
        

            const newUser = {
                googleId : profile.id,
                displayName : profile.displayName,
                firstName : profile.name.givenName,
                lastName : profile.name.familyName,
                email : profile.emails[0].value,
                image : profile.photos[0].value            
            }
            try {
                let user = await User.findOne({googleId : profile.id})

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.log (err)
            }
      }
    ))

    passport.serializeUser((user, done) => {       // da documentazione passport ( modificato function on arrow funtion)
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user)
        );
      });
}