"use strict";

const ShortId = require("shortid");

module.exports = {
    EntityShortId: () => {
        ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');
    
        // In Postgres, table names and entities should be lower case.
        return "pg"+ShortId.generate().toLowerCase();
    },
    
    InsertSampleUserEntity: async (db) => {
        return insertSampleUserEntityImpl(db);
    },
    
    InsertSampleUserEntities: async ( db, count ) => {
        let r = [];
    
        for( let i = 0 ; i < count; i++ ) {
            let newEntity = await insertSampleUserEntityImpl(db);
    
            r.push( newEntity );
        }
    
        return r;
    }
}

async function insertSampleUserEntityImpl(db) {
    const testName = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods;
    const entity = { name: testName, alias: ShortId.generate() };

    entity.ID = await db.Insert( "users" )
        .Values( entity )
        .Run()

    return entity;
}