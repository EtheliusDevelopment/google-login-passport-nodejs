// STEP 57 rotte per le stories => STEP 58 aggiungo la rotta ad app.js

const express = require ('express');
const router = express.Router();
const { ensureAuth } = require ('../middleware/auth')
const Story = require ('../models/Story')

//@ desc    Show add story page
//@route    GET /stories/add

router.get('/add', ensureAuth, (req, res) =>{
    res.render('stories/add')  // renderizzo hbs add dentro la cartella stories dentro views
})

// STEP 62 creo rotta funzione per salvare le sotrie => STEP 63 aggiungo la funzione body-parser in app js
//@ desc    Process add form
//@route    POST /stories

router.post('/', ensureAuth, async (req, res)=>{
    try {                                   //STEP 64 => STEP 65 creo cartella Helpers nella root e file hbs.js
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// STEP 70 creo rotta per listing stories => STEP 71 aggiungo altri helpers a hbs.js truncate+replace htmltags
//@ desc    Show all stories
//@route    GET /stories

router.get('/', ensureAuth, async(req, res) =>{
    try {
        const stories = await Story.find({status : "public"})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()

            res.render('stories/index', {
                stories,
            })
    } catch (err) {
        console.error(err)
        return res.render('error/500')
        
    }
})

// STEP 81 creo rotta per editare storie gia scritte dall'utente => STEP 82 creo la view di story/edit.hbs
//@ desc    Show edit Story
//@route    GET /stories/edit/:id


router.get('/edit/:id', ensureAuth, async(req, res) =>{
    try {
        const story = await Story.findOne({
            _id : req.params.id
        }).lean()
    
        if (!story) {
            res.render('error/404')
        }
    
        if (story.user != req.user.id){
            res.redirect ('/stories')
        } else {
            res.render ('stories/edit', {
                story,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }

})

// STEP 88 creo rotta per processare modifiche di storie gia scritte dall'utente => STEP 89 vado in dashboard a creo bottoni per funzionalita da listing
//@ desc    Process Update Story
//@route    PUT /stories/:id

router.put('/:id', ensureAuth, async (req, res) => {

    try {
        let story = await Story.findById(req.params.id).lean()

    if(!story){
        return res.render('error/404')
    }
    if (story.user != req.user.id){
        res.redirect ('/stories')
    } else {
        story = await Story.findOneAndUpdate({_id : req.params.id}, req.body, {
            new : true,
            runValidators: true,
        })
        res.redirect('/dashboard')
        }        
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
    
    })

// STEP 91 creo metodo delete per cancellare singola storia => STEP 92 creo rotta per leggere la singola storia da Public Sotries
//@ desc    Cancel a  Story
//@route    DELETE /stories/:id


router.delete('/:id', ensureAuth , async (req, res) => {
    try {
        await Story.remove({_id : req.params.id})
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// STEP 92 creo rotta per visualizzare singola storia => STEP 93 creo view per la storia single stories/show
//@ desc    Show asingle story
//@route    GET /stories/:id

router.get('/:id', ensureAuth, async (req, res) =>{
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()
        console.log(story)

        if (!story) {
            res.render('error/404')
        }
        res.render('stories/show', {
            story
        })
        
    } catch (err) {
        console.error(err)
        return res.render('error/500')
        
    }
    
})

// STEP 94 creo rotta per visualizzare storie di un utente => STEP 95 
//@ desc    Show stories from a single user
//@route    GET /stories/user/:userId

router.get('/user/:userId', ensureAuth, async (req, res)=>{
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('stories/index', {
            stories
        })
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})









module.exports = router

