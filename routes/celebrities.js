const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
	// get all the celebrities from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})

module.exports = router;