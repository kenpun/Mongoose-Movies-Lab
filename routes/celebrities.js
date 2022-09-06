const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

// listing our celebrities
router.get('/celebrities', (req, res, next) => {
	// get all the celebrities from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})

// celebrities/new view
router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
});

// the celebrity details page
router.get('/celebrities/:id', (req, res, next) => {
	const celebrityId = req.params.id
	Celebrity.findById(celebrityId)
		.then(celebrityFromDB => {
			console.log(celebrityFromDB)
			res.render('celebrities/show', { celebrity: celebrityFromDB })
		})
		.catch(err => next(err))
});

// post route for adding new celebrities
router.post('/celebrities', (req, res, next) => {
	// console.log(req.body)
	const { name, occupation, catchPhrase } = req.body
	Celebrity.create({ name, occupation, catchPhrase })
		.then(createdCelebrity => {
			console.log(createdCelebrity)
			// redirect to '/celebrities/<id of the celebrity>
			res.redirect(`/celebrities/${createdCelebrity._id}`)
			// we could also render the view again and pass
			// the object of the created book
			// res.render('celebrities/show', { celebrity: createdCelebrity })
		})
		.catch(err => next(err))

});

// post route to delete a celebrity from the database
router.post('/celebrities/:celebrityId/delete', (req, res, next) => {
	const { celebrityId } = req.params;

	Celebrity.findByIdAndDelete(celebrityId)
		.then(() => res.redirect('/celebrities'))
		.catch(err => next(err))
})

module.exports = router;