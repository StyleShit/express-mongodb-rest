const ucFirst = require( '../../utils' ).ucFirst;


// add model object to response by model id from url param
module.exports = ( model, name = 'item' ) => {

    return async ( req, res, next ) => {

        try
        {
            const item = await model.findById( req.params.id );

            if( item == null )
                return res.status( 404 ).json({ message: `${ ucFirst( name ) } not found` });


            res[name] = item;

            next();
        }

        catch( error )
        {
            res.status( 500 ).json( error );
        }

    };
}