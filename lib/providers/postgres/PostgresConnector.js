"use strict";

const { Pool, Client } = require("pg");
const DEFAULT_POSTGRES_PORT = 5432;

var DatabasePool = [];

module.exports = {
    /*
     * Runs a query using connections in pool
     * Returns the result of the query
     */
    RunQuery: async (databaseConfig, sqlQuery) => {
        if ( DatabasePool[databaseConfig.database] == null ) {
            DatabasePool[databaseConfig.database] = new Pool({
                user: databaseConfig.user,
                host: databaseConfig.host,
                database: databaseConfig.user,
                password: databaseConfig.password,
                port: databaseConfig.port ? databaseConfig.port : DEFAULT_POSTGRES_PORT              
            });
        }        

        console.log(sqlQuery);
        const pool = DatabasePool[databaseConfig.database];

        const result = await pool.query( sqlQuery );

        return JSON.parse(JSON.stringify(result)).rows;
    },
    
    /*
     * Run a query in its own connection. Connection to postgres database is open and closed
     */
    RunQueryOwnConnection: async (databaseConfig, sql) => {
        const client = new Client({
            user: databaseConfig.user,
            host: databaseConfig.host,
            database: databaseConfig.user,
            password: databaseConfig.password,
            port: databaseConfig.port ? databaseConfig.port : DEFAULT_POSTGRES_PORT              
        });

        await client.connect();

        try {
            const result = await client.query(sql);
            return result;
        } finally {
            await client.end();
        }
   }
}