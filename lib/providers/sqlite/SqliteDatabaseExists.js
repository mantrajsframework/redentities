"use strict";

const FsExtra = require("fs-extra");

module.exports = {
    async ExistsDatabase(sqlEntities) {
        return FsExtra.pathExists( sqlEntities.DatabaseConfig.databasepath );
    }
}