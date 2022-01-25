"use strict";

module.exports = {
    async ExistsDatabase(sqlEntities) {
        let sql = sqlEntities.Adaptors.Formatters.FormatShowDatabase( sqlEntities.DatabaseConfig.database );
        let result = await sqlEntities.RunQuery(sql);

        return result.length == 1;
    }
}