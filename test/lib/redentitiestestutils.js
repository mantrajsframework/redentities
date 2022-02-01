"use strict";

const { nanoid } = require("nanoid");

module.exports = {
    EntityShortId: () => {
        // In Postgres, table names and entities should be lower case.
        return "pg"+nanoid(12).toLowerCase().replace(/-/g,"A").replace(/_/g,"B");
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
    const testName = nanoid().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods;
    const entity = { name: testName, alias: nanoid() };

    entity.ID = await db.Insert( "users" )
        .Values( entity )
        .Run()

    return entity;
}