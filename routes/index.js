const router = require( 'express' ).Router();


// home route
router.get( '/', ( req, res ) => {

    res.json({ message: 'This is home!' });

});

// posts routes
router.use( '/posts', require( './posts' ) );


module.exports = router;