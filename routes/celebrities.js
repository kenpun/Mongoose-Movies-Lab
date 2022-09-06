const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

// show all celebrities
router.get('/celebrities', (req, res, next) => {
	// get all the celebrities from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})

// celebrities/new - show a form to create a celebrity
router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
});

// show a specific celebrity
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

// get route to shows to edit a celebrity
router.get('/celebrities/:celebrityId/edit', (req, res, next) => {
	const { celebrityId } = req.params;
	
	Celebrity.findById(celebrityId)
		.then(celebrityFromDB => {
			res.render('celebrities/edit', { celebrity: celebrityFromDB })
		})
		.catch(err => next(err))
});

// post route to send the data from the form to this route to update
// and save the celebrity from the database
router.post('/celebrities/edit/:id', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
	const id = req.params.id
	// update this book in the db
	// if this should return the updated book -> add {new: true} 
	Celebrity.findByIdAndUpdate(id, {
		name, occupation, catchPhrase
	}, { new: true })
		.then(updatedCelebrity => {
			console.log(updatedCelebrity)
			// redirect to the detail page of the updated book	
			res.redirect(`/celebrities/${updatedCelebrity._id}`)
		})
		.catch(err => {
			next(err)
		})
});

// post route to delete a specific celebrity
router.post('/celebrities/:celebrityId/delete', (req, res, next) => {
	const { celebrityId } = req.params;

	Celebrity.findByIdAndDelete(celebrityId)
		.then(() => res.redirect('/celebrities'))
		.catch(err => next(err))
})

module.exports = router;