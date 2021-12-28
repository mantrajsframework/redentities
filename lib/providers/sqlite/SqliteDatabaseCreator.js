"use strict";

const Sqlite = require("sqlite3");

module.exports = {
    CreateDatabase: async (databaseName, formatters, connector, databaseConfig) => {
        await createEmptyFile(databaseConfig.databasepath);
        // Next query force to create db file with sqlite database structure, not an empty file
        
        return connector.RunQuery( databaseConfig, "create table t(f int); drop table t;" );
    }
}

async function createEmptyFile(databasepath) {
    return new Promise((res, rej) => {
        new Sqlite.Database(databasepath, (err) => {
            if (err) {
                return rej(err);
            }
            res();
        });
    });
}