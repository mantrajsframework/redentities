"use strict";

const RedEntitiesConstants = require("./redentitiesconstants");
const SqlEntities = require("./SqlEntities");

class RedEntities {
    constructor(databaseConfig) {
        this.DatabaseConfig = databaseConfig;
    }

    Entities( schema ) {        
        switch( this.DatabaseConfig.provider ) {
            case RedEntitiesConstants.MYSQL_PROVIDER: {
                return new SqlEntities( this.DatabaseConfig, schema, getMysqlAdaptors() );
            }
            case RedEntitiesConstants.SQLITE_PROVIDER: {
                return new SqlEntities( this.DatabaseConfig, schema, getSqliteAdaptors() );
            }
            case RedEntitiesConstants.POSTGRES_PROVIDER: {
                return new SqlEntities( this.DatabaseConfig, schema, getPostgresAdaptors() );
            }

            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

function getMysqlAdaptors() {
    return {
        Connector: require("./providers/mysql/MySqlConnector"),
        Formatters: require("./providers/mysql/MySqlFormatters"),
        DatabaseRemover: require("./providers/mysql/MySqlDatabaseRemover"),
        DatabaseCreator: require("./providers/mysql/MySqlDatabaseCreator"),
        DatabaseExists: require("./providers/mysql/MySqlDatabaseExists")
    }
}

function getSqliteAdaptors() {
    return {
        Connector: require("./providers/sqlite/SqliteConnector"),
        Formatters: require("./providers/sqlite/SqliteFormatters"),
        DatabaseRemover: require("./providers/sqlite/SqliteDatabaseRemover"),
        DatabaseCreator: require("./providers/sqlite/SqliteDatabaseCreator"),
        DatabaseExists: require("./providers/sqlite/SqliteDatabaseExists")
    }
}

function getPostgresAdaptors() {
    return {
        Connector: require("./providers/postgres/PostgresConnector"),
        Formatters: require("./providers/postgres/PostgresFormatters"),
        DatabaseRemover: require("./providers/postgres/PostgresDatabaseRemover"),
        DatabaseCreator: require("./providers/postgres/PostgresDatabaseCreator"),
        DatabaseExists: require("./providers/postgres/PostgresDatabaseExists"),
        ResultsInterpreter: require("./providers/postgres/PostgresResultsInterpreter")
    }
}

module.exports = (databaseConfig) => new RedEntities(databaseConfig);