const router = require( 'express' ).Router();
const Post = require( '../models/post' );
const paginate = require( './middlewares/paginate' );
const getItem = require( './middlewares/getItem' );


// use middlewares
router.use( '/:id', getItem( Post, 'post' ) );


/**
 * Routes
 */

// get all posts
router.get( '/', paginate( Post ), async ( req, res ) => {

    res.json( res.paginatedResults );

});


// create post
router.post( '/', async ( req, res ) => {

    try
    {
        const post = new Post({

            title: req.body.title,
            description: req.body.description
    
        });

        const newPost = await post.save();

        res.status( 201 ).json( newPost );
    }

    catch( error )
    {
        res.status( 400 ).json( error );
    }

});


// get post by id
router.get( '/:id', ( req, res ) => {

    res.json( res.post );

});


// delete post by id
router.delete( '/:id', async ( req, res ) => {

    try
    {
        const deletedPost = await res.post.delete();

        res.json( deletedPost );
    }

    catch( error )
    {
        res.status( 500 ).json( error );
    }

});


// update post by id
router.patch( '/:id', async ( req, res ) => {

    try
    {
        const post = res.post;

        if( req.body.title )
            post.title = req.body.title;

        if( req.body.description )
            post.description = req.body.description;


        const updatedPost = await post.save();

        res.json( updatedPost );
    }

    catch( error )
    {
        res.status( 500 ).json( error );
    }

});



module.exports = router;