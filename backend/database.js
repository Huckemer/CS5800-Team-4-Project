const mysql = require( 'mysql' );
//Establishes a connection between database
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
        this.connection.connect();
    }
    query( sql, args ) {
        console.log(sql);
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports = Database