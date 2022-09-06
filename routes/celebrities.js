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

module.exports = router;