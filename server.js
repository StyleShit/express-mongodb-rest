const express = require( 'express' );
const mongoose = require( 'mongoose' );
require( 'dotenv/config' );


// init express server
const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


// configure routes
app.use( require( './routes' ) );


// connect to DB
const connectionOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect( process.env.DB_CONNECTION, connectionOptions )
    .then( () => {

        console.log( 'Connected to DB!' );

    })
    
    .then( () => {
        
        const port = process.env.PORT;

        // listen to incoming connections
        app.listen( port, () => {

            console.log( `Server listening on http://localhost:${ port }` );

        });

    });