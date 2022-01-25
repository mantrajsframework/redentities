"use strict";

module.exports = {
    CreateDatabase: async (databaseName, formatters, connector, databaseConfig) => {
        let sql = formatters.FormatCreateDatabase( databaseName );

        // Note: remove a new database should be done with new connection
        return connector.RunQueryOwnConnection( databaseConfig, sql );
    }
}