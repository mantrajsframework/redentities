"use strict";

module.exports = {
    RemoveDatabase: async (databaseName, formatters, connector, databaseConfig) => {
        let sql = formatters.FormatDropDatabase( databaseName );

        // Note: remove a new database should be done with new connection
        return connector.RunQueryOwnConnection( databaseConfig, sql );
    }
}