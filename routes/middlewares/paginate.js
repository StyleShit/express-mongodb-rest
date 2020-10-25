// add pagination for model by `page` / `limit` params
module.exports = ( model ) => {

    return async ( req, res, next ) => {

        // get the total count of items in db
        const itemsCount = await model.countDocuments();

        // get page/limit params or set defaults
        let page  = Math.max( 0, parseInt( req.body.page ) )  || 1;
        let limit = Math.max( 0, parseInt( req.body.limit ) ) || 10;

        // make sure that page/limit won't exceed the items count
        limit = Math.min( limit, parseInt( itemsCount ) );
        page = Math.min( page, Math.ceil( itemsCount / limit ) );


        const startIndex = ( page - 1 ) * limit;
        const endIndex = page * limit;

        let response = {
            current: {
                page: page,
                limit: limit
            }
        };

        // there is previous page
        if( startIndex > 0 )
        {
            response.prev = {
                page: page - 1,
                limit: limit
            };
        }

        // there is next page
        if( endIndex < itemsCount )
        {
            response.next = {
                page: page + 1,
                limit: limit
            };
        }


        try
        {
            // query items from db
            const items = await model.find().limit( limit ).skip( startIndex );

            // add results to the response object
            response.items = items;
            res.paginatedResults = response;

            next();
        }

        catch( error )
        {
            return res.status( 500 ).json( error );
        }
    };
}